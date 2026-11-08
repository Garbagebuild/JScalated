#!/system/bin/sh
# This file replaces only the data-side updater entry point. The immutable
# system updater remains available for recovery and system updates.
DIR=/data/local/service/updater
ORIGINAL="$DIR/original-updater-daemon"
EXECUTABLE="$DIR/executable-updater-daemon"
APPSCMD="$DIR/appscmd"

/system/bin/rm -f "$EXECUTABLE" || exit 80
if ! /system/bin/cp -f "$ORIGINAL" "$EXECUTABLE"; then
  /system/bin/cp -f /system/kaios/updater-daemon "$EXECUTABLE" || exit 81
fi
/system/bin/chmod 755 "$EXECUTABLE" || exit 82
/system/bin/restorecon "$EXECUTABLE" >/dev/null 2>&1 || :

# The API daemon creates this socket. Start the bridge only when it is ready.
# This subshell does not restart B2G or the phone.
(
  count=0
  while [ ! -S /data/local/tmp/apps-uds.sock ] && [ "$count" -lt 120 ]; do
    /system/bin/sleep 1
    count=$((count + 1))
  done
  if [ -S /data/local/tmp/apps-uds.sock ] && [ -x "$APPSCMD" ]; then
    "$APPSCMD" daemon
  fi
) >/dev/null 2>&1 &

# updater-daemon.sh passes updater.toml here; preserve every argument.
exec "$EXECUTABLE" "$@"
