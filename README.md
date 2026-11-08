# JScalated

Source for [jscalated.netlify.app](https://jscalated.netlify.app/), a KaiOS 3 development site. It stages ADB support, provides app management tools, and offers an optional appscmd installer for OStore.

## Files

This directory is the deploy root. There is no build step. index.html is the landing page, adb.js runs the on-phone ADB interface, and _headers sets the MIME types and CORS headers used by Netlify.

The downloads/jscalated-adb-key.zip bundle contains a shared ADB private key. The key is deliberately distributed to anyone who downloads the bundle; it does not provide private authentication. Do not use it for unrelated devices.

## appscmd

Checking **Install appscmd for OStore** downloads jscalated-appscmd-armv7.bin, the wrapper, and the installer script. adb.js now writes the binary in 64 KiB chunks when the phone exposes DeviceStorage.addNamed and appendNamed. It reads the entire file back and compares every byte before staging the reboot request. If those methods are unavailable, it uses the original Directory.createFile path.

A previous mismatched appscmd staging file is removed only when no appscmd install request is pending. Other staged files are left alone. A mismatch error prints the expected and stored sizes, first differing offset, and file headers. This write path has not yet been tested on a phone.

The bundled ARM binary is 1,350,712 bytes. Its SHA-256 is 7cac3c9cd14a02a62b91a06ff148760cd51a1ad573b1d11e78e00222c1f162b7.

## License

The website's original source code and documentation are available under the [MIT License](LICENSE). The prebuilt appscmd binary and shared key bundle are included as site assets. This license does not claim ownership of third-party code in the binary.