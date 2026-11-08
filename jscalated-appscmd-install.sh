#!/system/bin/sh
# One-time installer run by the JScalated parent XPI after an explicit request.
set -eu
PROFILE=$1
REQUEST_ID=$2
DIR=/data/local/service/updater
TARGET="$DIR/updater-daemon"
ORIGINAL="$DIR/original-updater-daemon"
BRIDGE="$DIR/appscmd"
WRAPPER="$PROFILE/jscalated-appscmd-wrapper.sh"
BRIDGE_SOURCE="$PROFILE/jscalated-appscmd-armv7.bin"
WRAPPER_TEMP="$DIR/.jscalated-appscmd-wrapper-$REQUEST_ID"
BRIDGE_HASH=7cac3c9cd14a02a62b91a06ff148760cd51a1ad573b1d11e78e00222c1f162b7
WRAPPER_HASH=f6b25737723560e8554cd387f2542656321314bb95149c3ade3417694b8f8c7b
STOPPED=0
REPLACED=0
CREATED=0

hash_file() {
  /system/bin/toybox sha256sum "$1" | /system/bin/toybox cut -d ' ' -f 1
}
recover() {
  code=$?
  trap - EXIT
  if [ "$STOPPED" = 1 ]; then
    if [ "$REPLACED" = 1 ]; then
      /system/bin/setprop ctl.stop updater-daemon || :
      /system/bin/cp -f "$ORIGINAL" "$TARGET" && /system/bin/chmod 755 "$TARGET" || :
      restored=$(/system/bin/ls -liZ "$TARGET" 2>/dev/null || :)
      case "$restored" in *u:object_r:api-daemon_exec:s0*) label_ok=1;; *) label_ok=0;; esac
      if [ "$label_ok" != 1 ] ||
         [ "$(hash_file "$TARGET")" != "$(hash_file /system/kaios/updater-daemon)" ]; then
        # The stock startup script recreates the executable inode and label.
        /system/bin/rm -f "$DIR/init" "$TARGET" ||
          echo 'CRITICAL: stock updater cleanup failed; do not reboot'
      fi
    fi
    /system/bin/setprop ctl.start updater-daemon || :
    if [ ! -f "$TARGET" ] ||
       [ "$(hash_file "$TARGET")" != "$(hash_file /system/kaios/updater-daemon)" ]; then
      echo 'CRITICAL: stock updater was not restored; do not reboot'
    fi
  fi
  if [ "$CREATED" = 1 ]; then
    /system/bin/rm -f "$WRAPPER_TEMP"
    if [ "$REPLACED" = 0 ] || [ "$(hash_file "$TARGET")" = "$(hash_file /system/kaios/updater-daemon)" ]; then
      /system/bin/rm -f "$ORIGINAL" "$BRIDGE"
    fi
  fi
  exit "$code"
}
trap recover EXIT

case "$REQUEST_ID" in *[!0-9a-f]*|'') echo 'Invalid request ID'; exit 10;; esac
[ "${#REQUEST_ID}" -eq 16 ] || exit 11
[ -f "$TARGET" ] && [ -f "$DIR/init" ] && [ -f /system/kaios/updater-daemon ] || exit 12
[ -f "$BRIDGE_SOURCE" ] && [ -f "$WRAPPER" ] || exit 13
[ "$(hash_file "$BRIDGE_SOURCE")" = "$BRIDGE_HASH" ] || exit 14
[ "$(hash_file "$WRAPPER")" = "$WRAPPER_HASH" ] || exit 15
[ "$(hash_file "$TARGET")" = "$(hash_file /system/kaios/updater-daemon)" ] || {
  echo 'Updater differs from stock; leave it untouched'; exit 16;
}
[ ! -e "$ORIGINAL" ] && [ ! -e "$BRIDGE" ] && [ ! -e "$WRAPPER_TEMP" ] || {
  echo 'Existing appscmd staging found; leave it untouched'; exit 17;
}
BEFORE=$(/system/bin/ls -liZ "$TARGET")
case "$BEFORE" in *u:object_r:api-daemon_exec:s0*) :;; *) echo 'Unexpected updater label'; exit 18;; esac
set -- $BEFORE
INODE=$1
case "$(/system/bin/ls -l "$TARGET")" in -rwxr-xr-x*) :;; *) echo 'Updater is not mode 0755'; exit 19;; esac

STOPPED=1
/system/bin/setprop ctl.stop updater-daemon || exit 20
count=0
while [ "$(/system/bin/getprop init.svc.updater-daemon)" != stopped ]; do
  [ "$count" -lt 10 ] || exit 21
  /system/bin/sleep 1
  count=$((count + 1))
done
[ "$(hash_file "$TARGET")" = "$(hash_file /system/kaios/updater-daemon)" ] || exit 22
CREATED=1
/system/bin/cp "$TARGET" "$ORIGINAL" || exit 23
/system/bin/chmod 755 "$ORIGINAL" || exit 24
[ "$(hash_file "$ORIGINAL")" = "$(hash_file "$TARGET")" ] || exit 25
/system/bin/cp "$BRIDGE_SOURCE" "$BRIDGE" || exit 26
/system/bin/chmod 755 "$BRIDGE" || exit 27
/system/bin/restorecon "$BRIDGE" >/dev/null 2>&1 || :
[ "$(hash_file "$BRIDGE")" = "$BRIDGE_HASH" ] || exit 28
/system/bin/cp "$WRAPPER" "$WRAPPER_TEMP" || exit 29
/system/bin/chmod 755 "$WRAPPER_TEMP" || exit 30
: >> "$TARGET" || exit 31
REPLACED=1
/system/bin/cp -f "$WRAPPER_TEMP" "$TARGET" || exit 32
/system/bin/chmod 755 "$TARGET" || exit 33
[ "$(hash_file "$TARGET")" = "$WRAPPER_HASH" ] || exit 34
AFTER=$(/system/bin/ls -liZ "$TARGET")
case "$AFTER" in *u:object_r:api-daemon_exec:s0*) :;; *) echo 'Updater label changed'; exit 35;; esac
set -- $AFTER
[ "$1" = "$INODE" ] || { echo 'Updater inode changed'; exit 36; }
[ "$(/system/bin/getprop init.svc.updater-daemon)" = stopped ] || exit 37
/system/bin/rm -f "$WRAPPER_TEMP"
/system/bin/setprop ctl.start updater-daemon || exit 38
count=0
while [ "$(/system/bin/getprop init.svc.updater-daemon)" != running ]; do
  [ "$count" -lt 10 ] || exit 39
  /system/bin/sleep 1
  count=$((count + 1))
done
/system/bin/sleep 2
[ "$(/system/bin/getprop init.svc.updater-daemon)" = running ] || exit 40
echo 'Appscmd wrapper installed; updater service is running'
STOPPED=0
trap - EXIT
