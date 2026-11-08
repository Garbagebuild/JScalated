(function () {
  "use strict";

  var DEFAULT_BASE = "https://jscalated.netlify.app/";
  var XPI_NAME = "jscalated-adb@local.xpi";
  var XPI64 = "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";
  var USER_PREF = 'user_pref("extensions.startupScanScopes", 1);';
  var DEBUG_PREFS = [
    'user_pref("devtools.remote.usb.enabled", true);',
    'user_pref("devtools.debugger.remote-enabled", true);',
    'user_pref("devtools.debugger.unix-domain-socket", "/data/local/firefox-debugger-socket");'
  ];
  var old = document.getElementById("jscalated3-root");
  if (old) old.remove();
  var oldStyle = document.getElementById("jscalated3-style");
  if (oldStyle) oldStyle.remove();

  var entry = document.currentScript;
  if (!entry || !entry.src) {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (/\/adb\.js(?:[?#]|$)/.test(scripts[i].src || "")) {
        entry = scripts[i];
        break;
      }
    }
  }
  var scriptUrl = entry && entry.src ? entry.src :
    (window.JSCALATED_ASSET_BASE || DEFAULT_BASE) + "adb.js";
  var assetBase = scriptUrl.replace(/[^/?#]+(?:[?#].*)?$/, "");
  if (assetBase.charAt(assetBase.length - 1) !== "/") assetBase += "/";

  var style = document.createElement("style");
  style.id = "jscalated3-style";
  style.textContent = [
    "#jscalated3-root{position:fixed;inset:0;z-index:2147483647;box-sizing:border-box;",
    "overflow:auto;background:#050505;color:#29f36a;font:14px/1.45 monospace;padding:10px}",
    "#jscalated3-root *{box-sizing:border-box}",
    "#jscalated3-root .card{max-width:520px;margin:0 auto}",
    "#jscalated3-root h1{font-size:20px;margin:0 0 8px}",
    "#jscalated3-root p{margin:8px 0}",
    "#jscalated3-root button,#jscalated3-root a.download{display:block;width:100%;",
    "padding:9px;margin:8px 0;border:1px solid #29f36a;border-radius:4px;",
    "background:#102116;color:#d8ffe4;font:inherit;text-align:center;cursor:pointer}",
    "#jscalated3-root button:focus,#jscalated3-root a:focus,",
    "#jscalated3-root input:focus{outline:3px solid #f6e94b}",
    "#jscalated3-root label{display:block;padding:9px;margin:8px 0;",
    "border:1px solid #1d9e4b;color:#d8ffe4}",
    "#jscalated3-root input[type=checkbox]{width:auto;margin-right:8px}",
    "#jscalated3-root input[type=text],#jscalated3-root select{display:block;width:100%;",
    "padding:9px;background:#07150b;border:1px solid #1d9e4b;color:#d8ffe4;font:inherit}",
    "#jscalated3-root pre{min-height:100px;max-height:38vh;overflow:auto;",
    "white-space:pre-wrap;overflow-wrap:anywhere;padding:8px;margin:8px 0;",
    "border:1px solid #1d9e4b;background:#000;color:#d8ffe4}",
    "#jscalated3-root .hint{font-size:12px;color:#9cebb5}",
    "#jscalated3-root .logo{display:none;align-items:center;justify-content:center;",
    "width:70px;height:70px;margin:8px auto;border:3px solid #29f36a;",
    "border-radius:50%;box-shadow:0 0 14px #29f36a;font:bold 25px monospace}",
    "#jscalated3-root .logo.done{display:flex}"
  ].join("");
  (document.head || document.documentElement).appendChild(style);

  var host = document.createElement("div");
  host.id = "jscalated3-root";
  var card = document.createElement("div");
  card.className = "card";
  host.appendChild(card);
  (document.body || document.documentElement).appendChild(host);

  function add(tag, parent, textValue, className) {
    var node = document.createElement(tag);
    if (textValue !== null) node.textContent = textValue;
    if (className) node.className = className;
    parent.appendChild(node);
    return node;
  }
  add("h1", card, "JScalated");
  add("p", card, "ADB, apps, and developer tools from the System page", "hint");
  var logo = add("div", card, "JS", "logo");
  logo.setAttribute("aria-label", "ADB enabled");
  var debugLabel = add("label", card, null);
  var debuggerBox = add("input", debugLabel, null);
  debuggerBox.type = "checkbox";
  debuggerBox.tabIndex = 0;
  debugLabel.appendChild(document.createTextNode("Enable WebIDE debugger"));
  var label = add("label", card, null);
  var wireless = add("input", label, null);
  wireless.type = "checkbox";
  wireless.tabIndex = 0;
  label.appendChild(document.createTextNode("Enable wireless ADB on port 5555"));
  var appscmdLabel = add("label", card, null);
  var appscmdBox = add("input", appscmdLabel, null);
  appscmdBox.type = "checkbox";
  appscmdBox.tabIndex = 0;
  appscmdLabel.appendChild(document.createTextNode("Install appscmd for OStore (requires a full phone restart)"));
  var enable = add("button", card, "Enable ADB");
  enable.type = "button";
  enable.tabIndex = 0;
  add("p", card, "Error log / activation status", "hint");
  var logBox = add("pre", card, "Ready. Press Enable ADB.");
  logBox.id = "jscalated3-log";
  var check = add("button", card, "View activation log (optional)");
  check.type = "button";
  check.tabIndex = 0;
  var reload = add("button", card, "Reload JS (fetch edited adb.js)");
  reload.type = "button";
  reload.tabIndex = 0;
  var link = add("a", card, "Download computer ADB key bundle", "download");
  link.href = assetBase + "downloads/jscalated-adb-key.zip";
  link.tabIndex = 0;
  add("p", card, "After staging, turn the whole phone off and back on. Then try ADB from your computer. Reopen this panel only to see logs or the success logo.", "hint");
  add("p", card, "Disable preinstalled apps", "hint");
  add("p", card, "AppsManager changes app status directly. System, Homescreen, and phone-critical apps are protected.", "hint");
  var scanApps = add("button", card, "Refresh installed apps");
  scanApps.id = "btnRefreshApps";
  var appSelect = add("select", card, null);
  appSelect.id = "appManagerSelect";
  appSelect.setAttribute("aria-label", "Installed app");
  var appDetails = add("pre", card, "Refresh the app list to begin.", "hint");
  appDetails.id = "appManagerDetails";
  var advancedLabel = add("label", card, null);
  var advancedApps = add("input", advancedLabel, null);
  advancedApps.id = "appManagerAdvanced";
  advancedApps.type = "checkbox";
  advancedLabel.appendChild(document.createTextNode("Allow caution apps (core apps remain blocked)"));
  var disableApp = add("button", card, "Disable selected app");
  disableApp.id = "btnDisableApp";
  disableApp.disabled = true;
  var restoreApp = add("button", card, "Restore selected app");
  restoreApp.id = "btnEnableApp";
  restoreApp.disabled = true;
  var restoreAll = add("button", card, "Restore all apps disabled by JScalated");
  restoreAll.id = "btnRestoreApps";
  restoreAll.disabled = true;
  add("p", card, "Device settings", "hint");
  add("p", card, "Read a setting before changing it. Values use JSON: true, 30, or \"text\". Changing connectivity settings can disconnect this page.", "hint");
  var settingSelect = add("select", card, null);
  settingSelect.id = "jscalated3-setting-select";
  settingSelect.setAttribute("aria-label", "Device setting");
  [
    ["", "Select a device setting"],
    ["screen.timeout", "Screen timeout"],
    ["wifi.enabled", "Wi-Fi enabled"],
    ["bluetooth.enabled", "Bluetooth enabled"],
    ["airplaneMode.enabled", "Airplane mode enabled"],
    ["ril.data.enabled", "Mobile data enabled"],
    ["custom", "Custom setting name..."]
  ].forEach(function (choice) {
    var option = add("option", settingSelect, choice[1]);
    option.value = choice[0];
  });
  var customSetting = add("input", card, null);
  customSetting.id = "jscalated3-setting-name";
  customSetting.type = "text";
  customSetting.placeholder = "custom.setting.name";
  customSetting.setAttribute("aria-label", "Custom setting name");
  customSetting.style.display = "none";
  var settingValue = add("input", card, null);
  settingValue.id = "jscalated3-setting-value";
  settingValue.type = "text";
  settingValue.placeholder = "New value (JSON, for example true or 30)";
  settingValue.setAttribute("aria-label", "New setting value");
  var readSetting = add("button", card, "Read selected setting");
  readSetting.id = "jscalated3-setting-read";
  readSetting.type = "button";
  var saveSetting = add("button", card, "Apply selected setting");
  saveSetting.id = "jscalated3-setting-save";
  saveSetting.type = "button";
  var settingStatus = add("pre", card, "Select a setting, then read its current value.", "hint");
  settingStatus.id = "jscalated3-setting-status";
  var agentTitle = add("p", card, "Remote semi-root shell (advanced users)", "hint");
  agentTitle.id = "jscalated3-agent-title";
  var serverInput = add("input", card, null);
  serverInput.type = "text";
  serverInput.placeholder = "http://192.168.1.2:9000";
  serverInput.setAttribute("aria-label", "Agent LAN server URL");
  var agentButton = add("button", card, "Install Remote Semi-root Shell (For Advanced Users)");
  agentButton.type = "button";
  var agentGuide = add("a", card, "Agent setup and server files", "download");
  agentGuide.href = "https://kaios-agent.netlify.app/";
  add("p", card, "Build api_agent_api23 with your computer IP and port, then run its server.py. Enter that LAN URL here. The phone downloads the binary and starts it after a full phone reboot.", "hint");
  add("p", card, "Custom Mozilla preferences", "hint");
  add("p", card, "Enter a full preference name and a JSON value. This updates user.js; the preference takes effect after B2G starts again.", "hint");
  var customPrefName = add("input", card, null);
  customPrefName.type = "text";
  customPrefName.placeholder = "devtools.example.preference";
  customPrefName.setAttribute("aria-label", "Mozilla preference name");
  var customPrefValue = add("input", card, null);
  customPrefValue.type = "text";
  customPrefValue.placeholder = "Preference value (true, 30, or \"text\")";
  customPrefValue.setAttribute("aria-label", "Mozilla preference value");
  var saveCustomPref = add("button", card, "Save preference to user.js");
  saveCustomPref.type = "button";

  function log(message) {
    if (logBox.textContent === "Ready. Press Enable ADB.") logBox.textContent = "";
    logBox.textContent += String(message) + "\n";
    logBox.scrollTop = logBox.scrollHeight;
  }
  function fail(prefix, error) {
    log(prefix + ": " + String(error && (error.name + ": " + error.message) || error));
  }
  function isDir(entry) {
    return !!entry && typeof entry.getFilesAndDirectories === "function";
  }
  function bytesFromBase64(value) {
    var binary = atob(value);
    var out = new Uint8Array(binary.length);
    for (var j = 0; j < binary.length; j++) out[j] = binary.charCodeAt(j);
    return out;
  }
  function same(a, b) {
    if (a.length !== b.length) return false;
    for (var j = 0; j < a.length; j++) if (a[j] !== b[j]) return false;
    return true;
  }
  function mismatchDetails(actual, expected) {
    var first = 0;
    while (first < Math.min(actual.length, expected.length) && actual[first] === expected[first]) first++;
    function header(bytes) {
      return Array.from(bytes.slice(0, 16)).map(function (byte) {
        return byte.toString(16).padStart(2, "0");
      }).join(" ");
    }
    return "expected " + expected.length + " bytes, stored " + actual.length +
      " bytes, first difference at " + first + "; expected header " + header(expected) +
      "; stored header " + header(actual);
  }
  function readBytes(file, max) {
    return new Promise(function (resolve, reject) {
      if (!file || isDir(file) || file.size > max) {
        reject(Error("File is missing, a directory, or exceeds " + max + " bytes"));
        return;
      }
      var reader = new FileReader();
      reader.onload = function () { resolve(new Uint8Array(reader.result)); };
      reader.onerror = function () { reject(reader.error || Error("FileReader failed")); };
      reader.readAsArrayBuffer(file);
    });
  }
  function decode(bytes) { return new TextDecoder("utf-8").decode(bytes); }
  async function fileAt(root, path) {
    try { return await root.get(path); }
    catch (firstError) {
      var node = root;
      var parts = path.split("/");
      for (var j = 0; j < parts.length; j++) {
        if (!isDir(node)) throw firstError;
        var children = await node.getFilesAndDirectories();
        node = children.find(function (child) { return child.name === parts[j]; });
        if (!node) throw firstError;
      }
      return node;
    }
  }
  async function entryOrNull(dir, name) {
    var entries = await dir.getFilesAndDirectories();
    return entries.find(function (item) { return item.name === name; }) || null;
  }
  async function profileInfo() {
    if (!navigator.b2g || !navigator.b2g.getDeviceStorage) {
      throw Error("System page does not expose b2g.getDeviceStorage");
    }
    var root = await navigator.b2g.getDeviceStorage("apps").getRoot();
    var mozilla = await fileAt(root, "b2g/mozilla");
    var ini = decode(await readBytes(await fileAt(mozilla, "profiles.ini"), 65536));
    var sections = ini.split(/^\[/m).filter(function (part) { return /^Profile\d+\]/.test(part); });
    var profiles = sections.map(function (section) {
      var path = /^Path=([^\r\n]+)/m.exec(section);
      var relative = /^IsRelative=(\d+)/m.exec(section);
      return {path: path && path[1].trim(), relative: relative && relative[1],
        isDefault: /^Default=1\s*$/m.test(section)};
    }).filter(function (item) { return !!item.path; });
    var chosen = profiles.filter(function (item) { return item.isDefault; });
    if (chosen.length !== 1) chosen = profiles.length === 1 ? profiles : [];
    if (chosen.length !== 1 || chosen[0].relative !== "1") {
      throw Error("Could not identify one relative default Mozilla profile");
    }
    var parts = chosen[0].path.split("/");
    if (parts.some(function (part) { return !/^[A-Za-z0-9._-]+$/.test(part) || part === "." || part === ".."; })) {
      throw Error("Unsafe Mozilla profile path in profiles.ini");
    }
    var profile = await fileAt(mozilla, chosen[0].path);
    if (!isDir(profile)) throw Error("Mozilla profile is not a directory");
    return {profile: profile, path: "/data/b2g/mozilla/" + chosen[0].path};
  }
  async function stageExact(dir, name, bytes, mime) {
    var readLimit = Math.max(1024 * 1024, bytes.length);
    var existing = await entryOrNull(dir, name);
    if (existing) {
      if (isDir(existing)) throw Error(name + " is a directory");
      var previous = await readBytes(existing, readLimit);
      if (!same(previous, bytes)) throw Error(name + " already exists with different contents: " + mismatchDetails(previous, bytes));
      log(name + " is already staged");
    } else {
      await dir.createFile(name, {ifExists: "fail", data: new Blob([bytes], {type: mime})});
      log("Wrote " + name);
    }
    var saved = await fileAt(dir, name);
    var actual = await readBytes(saved, readLimit);
    if (!same(actual, bytes)) throw Error(name + " read-back did not match: " + mismatchDetails(actual, bytes));
    log("Verified " + name + " (" + bytes.length + " bytes)");
  }
  function storageRequest(request) {
    if (request && typeof request.then === "function") return Promise.resolve(request);
    return new Promise(function (resolve, reject) {
      if (!request) { reject(Error("DeviceStorage returned no request")); return; }
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () {
        reject(request.error || Error("DeviceStorage write failed"));
      };
    });
  }
  async function stageAppscmd(active, bytes) {
    var name = "jscalated-appscmd-armv7.bin";
    var storage = navigator.b2g.getDeviceStorage("apps");
    if (!storage || typeof storage.addNamed !== "function" ||
        typeof storage.appendNamed !== "function") {
      log("Chunked DeviceStorage writes are unavailable; trying Directory.createFile");
      return stageExact(active.profile, name, bytes, "application/octet-stream");
    }
    if (active.path.indexOf("/data/b2g/mozilla/") !== 0) {
      throw Error("Unexpected Mozilla profile path for appscmd");
    }
    var relativePath = active.path.slice("/data/".length) + "/" + name;
    var existing = await entryOrNull(active.profile, name);
    if (existing) {
      if (isDir(existing)) throw Error(name + " is a directory");
      if (existing.size > 4 * 1024 * 1024) throw Error(name + " staging file is unexpectedly large");
      var previous = await readBytes(existing, Math.max(bytes.length, existing.size));
      if (same(previous, bytes)) {
        log("Verified existing " + name + " (" + bytes.length + " bytes)");
        return;
      }
      log("Previous appscmd staging differs: " + mismatchDetails(previous, bytes));
      if (await entryOrNull(active.profile, "jscalated3-appscmd.json")) {
        throw Error("An appscmd install request is pending; leave the staged binary untouched");
      }
      await active.profile.remove(name);
      log("Removed only the mismatched appscmd staging file");
    }
    var chunkSize = 64 * 1024;
    var count = Math.ceil(bytes.length / chunkSize);
    for (var offset = 0, index = 0; offset < bytes.length; offset += chunkSize, index++) {
      var part = new Blob([bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length))],
        {type: "application/octet-stream"});
      try {
        await storageRequest(offset === 0 ?
          storage.addNamed(part, relativePath) : storage.appendNamed(part, relativePath));
      } catch (error) {
        throw Error("appscmd chunk " + (index + 1) + "/" + count + " failed: " + error);
      }
    }
    var saved = await fileAt(active.profile, name);
    if (saved.size > 4 * 1024 * 1024) throw Error(name + " staged file is unexpectedly large");
    var actual = await readBytes(saved, Math.max(bytes.length, saved.size));
    if (!same(actual, bytes)) {
      throw Error(name + " chunked read-back did not match: " + mismatchDetails(actual, bytes));
    }
    log("Verified chunked appscmd binary (" + bytes.length + " bytes)");
  }
  async function stageProductXpi(extensions) {
    var nextBytes = bytesFromBase64(XPI64);
    var existing = await entryOrNull(extensions, XPI_NAME);
    if (!existing) {
      await stageExact(extensions, XPI_NAME, nextBytes, "application/x-xpinstall");
      return;
    }
    if (isDir(existing)) throw Error(XPI_NAME + " is a directory");
    var oldBytes = await readBytes(existing, 1024 * 1024);
    if (same(oldBytes, nextBytes)) {
      log("Current JScalated XPI is already staged");
      return;
    }
    var backupName = XPI_NAME + ".backup-" + requestId();
    await stageExact(extensions, backupName, oldBytes, "application/octet-stream");
    await extensions.remove(XPI_NAME);
    try {
      await stageExact(extensions, XPI_NAME, nextBytes, "application/x-xpinstall");
      log("Updated only the JScalated XPI; previous bytes are in " + backupName);
    } catch (error) {
      if (!(await entryOrNull(extensions, XPI_NAME))) {
        try { await stageExact(extensions, XPI_NAME, oldBytes, "application/x-xpinstall"); }
        catch (restoreError) { log("Old JScalated XPI restore failed: " + restoreError); }
      }
      throw error;
    }
  }
  async function stageUserJs(profile, enableDebugger) {
    var existing = await entryOrNull(profile, "user.js");
    var content = existing ? decode(await readBytes(existing, 65536)) : "";
    var originalContent = content;
    if (/^user_pref\("extensions\.startupScanScopes",/m.test(content) &&
        !/^user_pref\("extensions\.startupScanScopes",\s*1\);?\s*$/m.test(content)) {
      throw Error("user.js sets a conflicting add-on scan preference");
    }
    var additions = [];
    if (!/^user_pref\("extensions\.startupScanScopes",\s*1\);?\s*$/m.test(content)) additions.push(USER_PREF);
    if (enableDebugger) DEBUG_PREFS.forEach(function (line) {
      var key = line.match(/^user_pref\("([^"]+)"/)[1];
      var matches = content.split(/\r?\n/).filter(function (row) { return row.indexOf('user_pref("' + key + '"') === 0; });
      if (matches.length === 1 && matches[0].trim() === line) return;
      content = content.split(/\r?\n/).filter(function (row) {
        return row.indexOf('user_pref("' + key + '"') !== 0;
      }).join("\n");
      additions.push(line);
    });
    if (!additions.length) { log("Required profile preferences are already present"); return; }
    var updated = content + (content && !/\n$/.test(content) ? "\n" : "") + additions.join("\n") + "\n";
    if (existing) {
      var backupName = "user.js.jscalated3-backup-" + requestId();
      await stageExact(profile, backupName, new TextEncoder().encode(originalContent), "text/plain");
      await profile.remove("user.js");
    }
    try {
      await profile.createFile("user.js", {ifExists: "fail", data: updated});
      var saved = await fileAt(profile, "user.js");
      if (decode(await readBytes(saved, 65536)) !== updated) throw Error("user.js read-back did not match");
    } catch (error) {
      if (existing && !(await entryOrNull(profile, "user.js"))) {
        try { await profile.createFile("user.js", {ifExists: "fail", data: originalContent}); }
        catch (restoreError) { log("Restore of user.js failed: " + restoreError); }
      }
      throw error;
    }
    log("Staged profile preferences in user.js" + (enableDebugger ? " including WebIDE debugger" : ""));
  }
  async function stageCustomPref() {
    saveCustomPref.disabled = true;
    try {
      var name = customPrefName.value.trim();
      if (!/^[A-Za-z0-9._-]{1,128}$/.test(name)) {
        throw Error("Enter a preference name using letters, numbers, dots, underscores, or hyphens");
      }
      var raw = customPrefValue.value.trim();
      var value;
      try { value = JSON.parse(raw); }
      catch (_) { throw Error("Enter the value as JSON, such as true, 30, or \"text\""); }
      if (typeof value !== "boolean" && typeof value !== "string" &&
          !(typeof value === "number" && Number.isInteger(value) &&
            value >= -2147483648 && value <= 2147483647)) {
        throw Error("Mozilla preferences support booleans, strings, and 32-bit integers");
      }
      if (name === "extensions.startupScanScopes" && value !== 1) {
        throw Error("Changing extensions.startupScanScopes could prevent the existing JScalated XPI from loading");
      }
      var active = await profileInfo();
      var existing = await entryOrNull(active.profile, "user.js");
      if (existing && isDir(existing)) throw Error("user.js is a directory");
      var original = existing ? decode(await readBytes(existing, 65536)) : "";
      var escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var matchingLine = new RegExp('^[ \\t]*user_pref[ \\t]*\\([ \\t]*"' +
        escaped + '"[ \\t]*,[^\\r\\n]*(?:\\r?\\n|$)', "gm");
      var remaining = original.replace(matchingLine, "");
      var line = "user_pref(" + JSON.stringify(name) + ", " + JSON.stringify(value) + ");";
      var updated = remaining + (remaining && !/\n$/.test(remaining) ? "\n" : "") + line + "\n";
      if (updated.length > 65536) throw Error("Updated user.js would exceed 65536 bytes");
      if (updated === original) { log(name + " is already present in user.js"); return; }
      if (existing) {
        await stageExact(active.profile, "user.js.jscalated3-backup-" + requestId(),
          new TextEncoder().encode(original), "text/plain");
        await active.profile.remove("user.js");
      }
      try {
        await active.profile.createFile("user.js", {ifExists: "fail", data: updated});
        var saved = await fileAt(active.profile, "user.js");
        if (decode(await readBytes(saved, 65536)) !== updated) {
          throw Error("user.js read-back did not match");
        }
      } catch (error) {
        try {
          if (await entryOrNull(active.profile, "user.js")) await active.profile.remove("user.js");
          if (existing) await active.profile.createFile("user.js", {ifExists: "fail", data: original});
        } catch (restoreError) { log("Restore of user.js failed: " + restoreError); }
        throw error;
      }
      log("Saved " + name + " to user.js. It will take effect after B2G starts again.");
    } catch (error) { fail("Custom preference stopped", error); }
    finally { saveCustomPref.disabled = false; }
  }
  function requestId() {
    var bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    return Array.from(bytes).map(function (byte) { return (byte + 256).toString(16).slice(1); }).join("");
  }
  async function writeConfig(profile, config) {
    var name = "jscalated3-config.json";
    var content = JSON.stringify(config) + "\n";
    var existing = await entryOrNull(profile, name);
    if (existing) {
      if (isDir(existing)) throw Error(name + " is a directory");
      var oldContent = decode(await readBytes(existing, 4096));
      var oldId;
      try { oldId = JSON.parse(oldContent).requestId; }
      catch (_) { oldId = "unreadable"; }
      if (!/^[0-9a-f]{16}$/.test(oldId)) oldId = "unreadable";
      var backup = "jscalated3-config-backup-" + oldId + ".json";
      await stageExact(profile, backup, new TextEncoder().encode(oldContent), "application/json");
      await profile.remove(name);
    }
    await profile.createFile(name, {ifExists: "fail", data: content});
    var saved = await fileAt(profile, name);
    if (decode(await readBytes(saved, 4096)) !== content) throw Error("Configuration read-back did not match");
    log("Staged activation request " + config.requestId);
  }
  async function writeTask(profile, task) {
    var name = "jscalated3-task.json";
    var existing = await entryOrNull(profile, name);
    if (existing) {
      var previous = JSON.parse(decode(await readBytes(existing, 4096)));
      var prefsFile = await entryOrNull(profile, "prefs.js");
      var prefsText = prefsFile ? decode(await readBytes(prefsFile, 4 * 1024 * 1024)) : "";
      var previousResult = pref(prefsText, "jscalated3.taskResult") || "";
      if (!/^(success|failed):/.test(previousResult) || previousResult.indexOf(previous.taskId) < 0) {
        throw Error("An earlier app/agent task is still waiting for a phone reboot");
      }
      await profile.remove(name);
    }
    var bytes = new TextEncoder().encode(JSON.stringify(task) + "\n");
    await stageExact(profile, name, bytes, "application/json");
    log("Staged " + task.action + " task " + task.taskId + ". Fully reboot the phone to apply it.");
  }
  function fetchAppscmdAsset(name, minimum, maximum) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", assetBase + name, true);
      xhr.responseType = "arraybuffer";
      xhr.timeout = 30000;
      xhr.onload = function () {
        var bytes = new Uint8Array(xhr.response || new ArrayBuffer(0));
        if (xhr.status !== 200 || bytes.length < minimum || bytes.length > maximum) {
          reject(Error("Unexpected appscmd asset response for " + name + " (HTTP " + xhr.status + ")"));
        } else resolve(bytes);
      };
      xhr.onerror = function () { reject(Error("Could not download " + name)); };
      xhr.ontimeout = function () { reject(Error("Download timed out for " + name)); };
      xhr.send();
    });
  }
  async function writeAppscmdRequest(profile, id) {
    var name = "jscalated3-appscmd.json";
    var previous = await entryOrNull(profile, name);
    if (previous) {
      var prefsFile = await entryOrNull(profile, "prefs.js");
      var prefsText = prefsFile ? decode(await readBytes(prefsFile, 4 * 1024 * 1024)) : "";
      var previousId = JSON.parse(decode(await readBytes(previous, 4096))).requestId;
      var result = pref(prefsText, "jscalated3.appscmdResult") || "";
      if (result.indexOf(previousId) < 0 || !/^(success|failed):/.test(result)) {
        throw Error("An earlier appscmd request still needs a full phone restart");
      }
      await profile.remove(name);
    }
    await stageExact(profile, name,
      new TextEncoder().encode(JSON.stringify({requestId: id}) + "\n"), "application/json");
  }
  function fetchBinary(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.timeout = 20000;
      xhr.onload = function () {
        if (xhr.status !== 200 || !xhr.response) { reject(Error("Agent GET returned HTTP " + xhr.status)); return; }
        var bytes = new Uint8Array(xhr.response);
        if (bytes.length < 1000 || bytes.length > 1024 * 1024 ||
            bytes[0] !== 0x7f || bytes[1] !== 0x45 || bytes[2] !== 0x4c || bytes[3] !== 0x46) {
          reject(Error("Downloaded file is not an expected ELF binary")); return;
        }
        resolve(bytes);
      };
      xhr.onerror = function () { reject(Error("LAN download failed. Check server.py, phone Wi-Fi, and its CORS headers.")); };
      xhr.ontimeout = function () { reject(Error("LAN agent download timed out")); };
      xhr.send();
    });
  }
  async function stageAgent() {
    agentButton.disabled = true;
    try {
      var base = serverInput.value.trim().replace(/\/$/, "");
      var match = /^http:\/\/(\d{1,3}(?:\.\d{1,3}){3}):(\d{1,5})$/.exec(base);
      if (!match || match[1].split(".").some(function (part) { return Number(part) > 255; }) ||
          Number(match[2]) < 1 || Number(match[2]) > 65535) {
        throw Error("Enter a LAN URL such as http://192.168.1.2:9000");
      }
      log("Downloading api_agent_api23 from " + base + " ...");
      var bytes = await fetchBinary(base + "/api_agent_api23");
      var active = await profileInfo();
      var id = requestId();
      var filename = "jscalated-agent-" + id + ".bin";
      await stageExact(active.profile, filename, bytes, "application/octet-stream");
      await writeTask(active.profile, {taskId: id, action: "agent", binary: filename});
      log("The agent binary is staged. Fully reboot the phone, then follow the agent setup page to check its server.");
    } catch (error) { fail("Remote agent staging stopped", error); }
    finally { agentButton.disabled = false; }
  }
  async function doStage() {
    enable.disabled = true;
    logo.className = "logo";
    try {
      var appscmdAssets = null;
      if (appscmdBox.checked) {
        appscmdAssets = await Promise.all([
          fetchAppscmdAsset("jscalated-appscmd-armv7.bin", 1350712, 1350712),
          fetchAppscmdAsset("jscalated-appscmd-wrapper.sh", 200, 4096),
          fetchAppscmdAsset("jscalated-appscmd-install.sh", 1000, 8192)
        ]);
        if (appscmdAssets[0][0] !== 0x7f || appscmdAssets[0][1] !== 0x45 ||
            appscmdAssets[0][2] !== 0x4c || appscmdAssets[0][3] !== 0x46 ||
            appscmdAssets[0][18] !== 0x28) {
          throw Error("appscmd asset is not the expected ARM ELF binary");
        }
      }
      var active = await profileInfo();
      log("Using " + active.path);
      if (appscmdAssets) {
        await stageAppscmd(active, appscmdAssets[0]);
        await stageExact(active.profile, "jscalated-appscmd-wrapper.sh", appscmdAssets[1], "text/plain");
        await stageExact(active.profile, "jscalated-appscmd-install.sh", appscmdAssets[2], "text/plain");
      }
      var extensions = await entryOrNull(active.profile, "extensions");
      if (!extensions) extensions = await active.profile.createDirectory("extensions");
      if (!isDir(extensions)) throw Error("extensions is not a directory");
      await stageProductXpi(extensions);
      await stageUserJs(active.profile, !!debuggerBox.checked);
      var config = {requestId: requestId(), wireless: !!wireless.checked,
        debugger: !!debuggerBox.checked};
      await writeConfig(active.profile, config);
      if (appscmdAssets) await writeAppscmdRequest(active.profile, config.requestId);
      log("Stage complete. Turn the whole phone off and back on, then try ADB from your computer. The browser alone does not need rebooting.");
    } catch (error) { fail("Activation staging stopped", error); }
    finally { enable.disabled = false; }
  }
  function pref(textValue, name) {
    var re = new RegExp('^user_pref\\("' + name.replace(/\./g, "\\.") + '",\\s*(.*)\\);?\\s*$', "m");
    var match = re.exec(textValue);
    if (!match) return null;
    try { return JSON.parse(match[1].replace(/;?\s*$/, "")); }
    catch (_) { return match[1]; }
  }
  async function checkStatus() {
    check.disabled = true;
    try {
      var active = await profileInfo();
      var configEntry = await entryOrNull(active.profile, "jscalated3-config.json");
      if (!configEntry) { log("No activation request is staged in this profile."); return; }
      var config = JSON.parse(decode(await readBytes(configEntry, 4096)));
      var prefsEntry = await entryOrNull(active.profile, "prefs.js");
      var prefs = prefsEntry ? decode(await readBytes(prefsEntry, 4 * 1024 * 1024)) : "";
      var result = pref(prefs, "jscalated3.result");
      var completed = pref(prefs, "jscalated3.completedId");
      var bootResult = pref(prefs, "jscalated3.bootResult");
      var taskResult = pref(prefs, "jscalated3.taskResult");
      var appscmdResult = pref(prefs, "jscalated3.appscmdResult");
      log("Request " + config.requestId + ": " + (result || "waiting for reboot/startup"));
      if (bootResult) log("Most recent boot: " + bootResult);
      if (taskResult) log("Most recent app/agent task: " + taskResult);
      if (appscmdResult) log("Appscmd install: " + appscmdResult);
      if (completed === config.requestId &&
          (bootResult === "success:" + config.requestId ||
           (!bootResult && result === "success:" + config.requestId))) {
        logo.className = "logo done";
        log("ADB enabled. Use the downloaded computer key bundle to connect.");
      } else {
        logo.className = "logo";
      }
      var logEntry = await entryOrNull(active.profile, "jscalated3-" + config.requestId + ".log");
      if (logEntry && !isDir(logEntry)) {
        log("First activation log:\n" + decode(await readBytes(logEntry, 65536)));
      }
      var bootEntry = await entryOrNull(active.profile, "jscalated3-" + config.requestId + "-boot.log");
      if (bootEntry && !isDir(bootEntry)) {
        log("Latest boot check:\n" + decode(await readBytes(bootEntry, 65536)));
      }
      var taskEntry = await entryOrNull(active.profile, "jscalated3-task.json");
      if (taskEntry) {
        var stagedTask = JSON.parse(decode(await readBytes(taskEntry, 4096)));
        var taskLog = await entryOrNull(active.profile, "jscalated3-task-" + stagedTask.taskId + ".log");
        if (taskLog) log("App/agent task log:\n" + decode(await readBytes(taskLog, 65536)));
      }
      var appscmdEntry = await entryOrNull(active.profile, "jscalated3-appscmd.json");
      if (appscmdEntry) {
        var appscmdRequest = JSON.parse(decode(await readBytes(appscmdEntry, 4096)));
        var appscmdLog = await entryOrNull(active.profile,
          "jscalated3-appscmd-" + appscmdRequest.requestId + ".log");
        if (appscmdLog) log("Appscmd install log:\n" + decode(await readBytes(appscmdLog, 65536)));
      }
    } catch (error) { fail("Status check stopped", error); }
    finally { check.disabled = false; }
  }
  enable.addEventListener("click", doStage);
  saveCustomPref.addEventListener("click", stageCustomPref);
  check.addEventListener("click", checkStatus);
  agentButton.addEventListener("click", stageAgent);
  reload.addEventListener("click", function () {
    var script = document.createElement("script");
    script.src = scriptUrl.replace(/[?#].*$/, "") + "?t=" + Date.now();
    script.onerror = function () { log("Reload failed: " + script.src); };
    (document.head || document.documentElement).appendChild(script);
  });
  checkStatus();
})();

(function() {
  "use strict";

  var API_ROOT = "http://127.0.0.1/api/v1/";
  var STORAGE_KEY = "jscalated.disabledApps.v1";
  var ENABLED = 0;
  var DISABLED = 1;
  var manager = null;
  var session = null;
  var apps = [];
  var busy = false;

  var protectedOrigins = {
    "antitheft": true,
    "bluetooth": true,
    "callscreen": true,
    "communications": true,
    "contact": true,
    "customization": true,
    "download": true,
    "emergency-call": true,
    "fota": true,
    "ftu": true,
    "keyboard": true,
    "launcher": true,
    "homescreen": true,
    "loginpages": true,
    "network-alerts": true,
    "ringtones": true,
    "settings": true,
    "shared": true,
    "sms": true,
    "stk": true,
    "system": true,
    "wallpaper": true,
    "wappush": true
  };

  var safeOrigins = {
    "googlesearch": true,
    "kaios-news": true,
    "kaios-todo": true,
    "kaios-weather": true,
    "maps": true,
    "snake": true,
    "youtube": true
  };

  var appSelect = document.getElementById("appManagerSelect");
  var detailsEl = document.getElementById("appManagerDetails");
  var advancedEl = document.getElementById("appManagerAdvanced");
  var refreshButton = document.getElementById("btnRefreshApps");
  var disableButton = document.getElementById("btnDisableApp");
  var enableButton = document.getElementById("btnEnableApp");
  var restoreAllButton = document.getElementById("btnRestoreApps");

  function stringify(value) {
    try {
      return typeof value === "string" ? value : JSON.stringify(value);
    } catch (error) {
      return String(value);
    }
  }

  function errorText(error) {
    return stringify(error &&
      (error.stack || error.message || error.name || error.value || error));
  }

  function log(message) {
    var status = document.getElementById("jscalated3-log");
    var line = "[" + new Date().toISOString() + "] APP MANAGER: " +
      stringify(message);
    try {
      console.log(line);
    } catch (error) {}
    if (status) {
      status.textContent += (status.textContent ? "\n" : "") + line;
      status.scrollTop = status.scrollHeight;
    }
  }

  function loadScript(url) {
    return new Promise(function(resolve, reject) {
      var existing = document.querySelector(
        "script[data-jscalated-app-api=\"" + url + "\"]"
      );
      var script;
      if (existing && existing.getAttribute("data-loaded") === "true") {
        resolve();
        return;
      }
      script = existing || document.createElement("script");
      script.setAttribute("data-jscalated-app-api", url);
      script.onload = function() {
        script.setAttribute("data-loaded", "true");
        resolve();
      };
      script.onerror = function() {
        reject(new Error("Failed to load " + url));
      };
      if (!existing) {
        script.src = url;
        document.head.appendChild(script);
      }
    });
  }

  function loadAppsApi() {
    var urls = [
      API_ROOT + "shared/core.js",
      API_ROOT + "shared/session.js",
      API_ROOT + "apps/service.js"
    ];
    var chain = Promise.resolve();
    urls.forEach(function(url) {
      chain = chain.then(function() {
        if ((url.indexOf("session.js") >= 0 && window.lib_session) ||
            (url.indexOf("apps/service.js") >= 0 && window.lib_apps)) {
          return;
        }
        return loadScript(url);
      });
    });
    return chain;
  }

  function getSessionToken() {
    try {
      if (navigator.b2g && navigator.b2g.externalapi &&
          typeof navigator.b2g.externalapi.getToken === "function") {
        return navigator.b2g.externalapi.getToken();
      }
    } catch (error) {}
    return Promise.resolve("secrettoken");
  }

  function connectAppsManager() {
    if (manager) {
      return Promise.resolve(manager);
    }
    return loadAppsApi().then(function() {
      return getSessionToken();
    }).then(function(token) {
      return new Promise(function(resolve, reject) {
        var settled = false;
        var timeout = setTimeout(function() {
          if (!settled) {
            settled = true;
            reject(new Error("Timed out connecting to AppsManager"));
          }
        }, 12000);
        var state = {
          onsessionconnected: function() {
            window.lib_apps.AppsManager.get(session).then(function(value) {
              if (settled) {
                return;
              }
              settled = true;
              clearTimeout(timeout);
              manager = value;
              if (window.lib_apps.AppsStatus) {
                ENABLED = window.lib_apps.AppsStatus.ENABLED;
                DISABLED = window.lib_apps.AppsStatus.DISABLED;
              }
              resolve(manager);
            }, function(error) {
              if (!settled) {
                settled = true;
                clearTimeout(timeout);
                reject(error);
              }
            });
          },
          onsessiondisconnected: function() {
            manager = null;
            session = null;
            log("Apps service disconnected.");
          }
        };
        try {
          session = new window.lib_session.Session();
          session.open("websocket", "127.0.0.1", token, state, true);
        } catch (error) {
          settled = true;
          clearTimeout(timeout);
          reject(error);
        }
      });
    });
  }

  function callAppsUrlMethod(value, method, url, rest) {
    var address = new URL(String(url)).href;
    var args = rest || [];
    var request = method === "setEnabled" ? "SetEnabledRequest" : null;
    var codec = request && value.wrapper_payload_message &&
      value.wrapper_payload_message[request];
    function accepts(candidate) {
      if (!codec || typeof codec.encode !== "function") { return false; }
      try { codec.encode({ manifestUrl: candidate, status: args[0] }); return true; }
      catch (_) { return false; }
    }
    function call(first) {
      return Promise.resolve().then(function() {
        return value[method].apply(value, [first].concat(args));
      });
    }
    var first = codec && !accepts(address) && accepts(new URL(address)) ?
      new URL(address) : address;
    return call(first).catch(function(error) {
      var message = String((error && error.message) || error || "");
      if (typeof first === "string" &&
          /Expected\s+URL\s*,\s*(?:bug\s+|but\s+)?got\s+string/i.test(message)) {
        return call(new URL(address));
      }
      if (typeof first !== "string" &&
          /Expected\s+string\s*,\s*(?:bug\s+|but\s+)?got\s+(?:object|URL)/i.test(message)) {
        return call(address);
      }
      throw error;
    });
  }

  function manifestUrl(app) {
    return String(app && app.manifestUrl || "");
  }

  function originFrom(app, manifest) {
    var origin = app && app.origin ? String(app.origin) : "";
    var match;
    if (!origin && manifest && manifest.b2g_features) {
      origin = String(manifest.b2g_features.origin || "");
    }
    if (!origin) {
      match = manifestUrl(app).match(/^https?:\/\/([^./]+)\.localhost/i);
      if (match) {
        origin = match[1];
      }
    }
    match = origin.match(/^https?:\/\/([^./]+)\.localhost/i);
    if (match) origin = match[1];
    match = origin.match(/^app:\/\/([^./]+)(?:\.|$)/i);
    if (match) origin = match[1];
    return origin.toLowerCase();
  }

  function fetchManifest(app) {
    return new Promise(function(resolve) {
      var request = new XMLHttpRequest();
      var url = manifestUrl(app);
      if (!url) {
        resolve(null);
        return;
      }
      request.open("GET", url, true);
      request.onload = function() {
        try {
          resolve(JSON.parse(request.responseText));
        } catch (error) {
          resolve(null);
        }
      };
      request.onerror = function() {
        resolve(null);
      };
      try {
        request.send();
      } catch (error) {
        resolve(null);
      }
    });
  }

  function featureCount(value) {
    if (!value) {
      return 0;
    }
    if (Array.isArray(value)) {
      return value.length;
    }
    try {
      return Object.keys(value).length;
    } catch (error) {
      return 0;
    }
  }

  function classify(app, manifest) {
    var features = manifest && manifest.b2g_features || {};
    var origin = originFrom(app, manifest);
    var role = String(features.role || "").toLowerCase();
    var reason;

    var url = manifestUrl(app).toLowerCase();
    var visibleName = String(app && app.name || manifest && (manifest.name || manifest.short_name) || "").toLowerCase();
    if (protectedOrigins[origin] ||
        /^(system|homescreen|launcher)$/.test(visibleName) ||
        /^https?:\/\/(system|homescreen|launcher)\.localhost(?:\/|$)/.test(url) ||
        /^app:\/\/(system|homescreen|launcher)(?:\.|\/|$)/.test(url)) {
      return {
        level: "protected",
        reason: "Protected phone or boot component",
        origin: origin
      };
    }
    if (role === "system" || role === "homescreen" || role === "input") {
      return {
        level: "protected",
        reason: "Protected manifest role: " + role,
        origin: origin
      };
    }
    if (safeOrigins[origin]) {
      return {
        level: "safe",
        reason: "Optional content app",
        origin: origin
      };
    }

    reason = "Unknown or feature-providing app";
    if (features.core) {
      reason = "Manifest marks this app as core";
    } else if (featureCount(features.messages)) {
      reason = "Handles background system messages";
    } else if (featureCount(features.activities)) {
      reason = "Provides activities used by other apps";
    }
    return {
      level: "caution",
      reason: reason,
      origin: origin
    };
  }

  function appName(item) {
    return String(
      item.manifest && (item.manifest.short_name || item.manifest.name) ||
      item.app && item.app.name ||
      item.risk.origin ||
      "Unknown app"
    );
  }

  function isDisabled(item) {
    return Number(item.app.status) === Number(DISABLED);
  }

  function loadStoredDisabled() {
    try {
      var value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function saveStoredDisabled(urls) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
    } catch (error) {
      log("Could not save the restore list: " + errorText(error));
    }
  }

  function rememberDisabled(url) {
    var urls = loadStoredDisabled();
    if (urls.indexOf(url) < 0) {
      urls.push(url);
      saveStoredDisabled(urls);
    }
  }

  function forgetDisabled(url) {
    saveStoredDisabled(loadStoredDisabled().filter(function(item) {
      return item !== url;
    }));
  }

  function setBusy(value) {
    busy = !!value;
    refreshButton.disabled = busy;
    appSelect.disabled = busy;
    advancedEl.disabled = busy;
    renderSelected();
  }

  function selectedItem() {
    var index = Number(appSelect.value);
    return isNaN(index) ? null : apps[index] || null;
  }

  function renderSelected() {
    var item = selectedItem();
    var advanced = !!advancedEl.checked;
    var canDisable;
    if (!item) {
      detailsEl.textContent = "Refresh the app list to begin.";
      disableButton.disabled = true;
      enableButton.disabled = true;
      restoreAllButton.disabled = busy || loadStoredDisabled().length === 0;
      return;
    }

    canDisable = !isDisabled(item) &&
      item.risk.level !== "protected" &&
      (item.risk.level === "safe" || advanced);
    detailsEl.textContent =
      "Origin: " + (item.risk.origin || "unknown") +
      "\nStatus: " + (isDisabled(item) ? "disabled" : "enabled") +
      "\nRisk: " + item.risk.level +
      "\nReason: " + item.risk.reason +
      "\nRemovable flag: " + !!item.app.removable +
      "\nManifest: " + manifestUrl(item.app);

    disableButton.disabled = busy || !canDisable;
    enableButton.disabled = busy || !isDisabled(item);
    restoreAllButton.disabled = busy || loadStoredDisabled().length === 0;
  }

  function renderList() {
    var selectedUrl = selectedItem() ?
      manifestUrl(selectedItem().app) : "";
    while (appSelect.firstChild) appSelect.removeChild(appSelect.firstChild);
    apps.forEach(function(item, index) {
      var option = document.createElement("option");
      var state = isDisabled(item) ? "DISABLED" : "enabled";
      option.value = String(index);
      option.textContent =
        "[" + item.risk.level.toUpperCase() + "] " +
        appName(item) + " - " + state;
      if (manifestUrl(item.app) === selectedUrl) {
        option.selected = true;
      }
      appSelect.appendChild(option);
    });
    renderSelected();
  }

  function refreshApps() {
    if (busy) {
      return;
    }
    setBusy(true);
    detailsEl.textContent = "Connecting to the KaiOS Apps service...";
    connectAppsManager().then(function(value) {
      return value.getAll();
    }).then(function(list) {
      return Promise.all(list.map(function(app) {
        return fetchManifest(app).then(function(manifest) {
          return {
            app: app,
            manifest: manifest,
            risk: classify(app, manifest)
          };
        });
      }));
    }).then(function(items) {
      apps = items.sort(function(left, right) {
        var order = { safe: 0, caution: 1, protected: 2 };
        var riskDifference =
          order[left.risk.level] - order[right.risk.level];
        if (riskDifference) {
          return riskDifference;
        }
        return appName(left).localeCompare(appName(right));
      });
      log("Loaded " + apps.length + " registered apps.");
      setBusy(false);
      renderList();
    }, function(error) {
      setBusy(false);
      detailsEl.textContent = "App list failed: " + errorText(error);
      log("Refresh failed: " + errorText(error));
    });
  }

  function changeSelectedStatus(status) {
    var item = selectedItem();
    var url;
    if (busy || !item) {
      return;
    }
    if (status === DISABLED && item.risk.level === "protected") {
      log("Blocked an attempt to disable protected app " + appName(item) + ".");
      return;
    }
    if (status === DISABLED && item.risk.level !== "safe" &&
        !advancedEl.checked) {
      log("Enable Advanced app disabling before changing a caution app.");
      return;
    }

    url = manifestUrl(item.app);
    setBusy(true);
    log((status === DISABLED ? "Disabling " : "Restoring ") +
      appName(item) + " through AppsManager...");
    connectAppsManager().then(function(value) {
      return callAppsUrlMethod(value, "setEnabled", url, [status]);
    }).then(function(updated) {
      item.app = updated || item.app;
      item.app.status = status;
      if (status === DISABLED) {
        rememberDisabled(url);
      } else {
        forgetDisabled(url);
      }
      log(appName(item) + " is now " +
        (status === DISABLED ? "disabled." : "enabled."));
      setBusy(false);
      renderList();
    }, function(error) {
      setBusy(false);
      log("Status change failed: " + errorText(error));
      renderSelected();
    });
  }

  function restoreAll() {
    var urls = loadStoredDisabled().slice();
    var restored = [];
    var chain = Promise.resolve();
    if (busy || !urls.length) {
      return;
    }
    setBusy(true);
    log("Restoring " + urls.length + " app(s) disabled by this tool...");
    connectAppsManager().then(function(value) {
      urls.forEach(function(url) {
        chain = chain.then(function() {
          return callAppsUrlMethod(value, "setEnabled", url, [ENABLED]).then(function() {
            restored.push(url);
            log("Restored " + url);
          }, function(error) {
            log("Could not restore " + url + ": " + errorText(error));
          });
        });
      });
      return chain;
    }).then(function() {
      saveStoredDisabled(urls.filter(function(url) {
        return restored.indexOf(url) < 0;
      }));
      setBusy(false);
      refreshApps();
    }, function(error) {
      setBusy(false);
      log("Restore failed: " + errorText(error));
      renderSelected();
    });
  }

  if (!appSelect || !detailsEl || !advancedEl || !refreshButton ||
      !disableButton || !enableButton || !restoreAllButton) {
    log("UI elements are missing; app manager was not started.");
    return;
  }

  appSelect.addEventListener("change", renderSelected);
  advancedEl.addEventListener("change", renderSelected);
  refreshButton.addEventListener("click", refreshApps);
  disableButton.addEventListener("click", function() {
    changeSelectedStatus(DISABLED);
  });
  enableButton.addEventListener("click", function() {
    changeSelectedStatus(ENABLED);
  });
  restoreAllButton.addEventListener("click", restoreAll);
  renderSelected();

  window.KaiOSSafeAppManager = {
    refresh: refreshApps,
    restoreAll: restoreAll
  };
})();

(function () {
  "use strict";

  var select = document.getElementById("jscalated3-setting-select");
  var customName = document.getElementById("jscalated3-setting-name");
  var input = document.getElementById("jscalated3-setting-value");
  var readButton = document.getElementById("jscalated3-setting-read");
  var saveButton = document.getElementById("jscalated3-setting-save");
  var status = document.getElementById("jscalated3-setting-status");
  if (!select || !customName || !input || !readButton || !saveButton || !status) return;

  var ROOT = "http://127.0.0.1/api/v1/";
  var manager = null;
  var session = null;
  var connecting = null;

  function message(value) {
    status.textContent = String(value);
    var mainLog = document.getElementById("jscalated3-log");
    if (mainLog) mainLog.textContent += "\nSETTINGS: " + String(value);
  }
  function errorText(error) {
    return String(error && (error.message || error.name) || error);
  }
  function script(url) {
    return new Promise(function (resolve, reject) {
      var element = document.createElement("script");
      element.onload = resolve;
      element.onerror = function () { reject(Error("Failed to load " + url)); };
      element.src = url;
      (document.head || document.documentElement).appendChild(element);
    });
  }
  async function connect() {
    if (manager) return manager;
    if (connecting) return connecting;
    connecting = (async function () {
      if (!navigator.b2g || !navigator.b2g.externalapi ||
          typeof navigator.b2g.externalapi.getToken !== "function") {
        throw Error("System page does not expose the API daemon token");
      }
      if (!window.lib_session) {
        await script(ROOT + "shared/core.js");
        await script(ROOT + "shared/session.js");
      }
      if (!window.lib_settings) await script(ROOT + "settings/service.js");
      var token = await navigator.b2g.externalapi.getToken();
      return new Promise(function (resolve, reject) {
        var settled = false;
        var timeout = setTimeout(function () {
          if (!settled) {
            settled = true;
            reject(Error("Timed out connecting to SettingsManager"));
          }
        }, 12000);
        var state = {
          onsessionconnected: function () {
            window.lib_settings.SettingsManager.get(session).then(function (value) {
              if (settled) return;
              settled = true;
              clearTimeout(timeout);
              manager = value;
              resolve(value);
            }, function (error) {
              if (settled) return;
              settled = true;
              clearTimeout(timeout);
              reject(error);
            });
          },
          onsessiondisconnected: function () {
            manager = null;
            session = null;
            if (settled) message("Settings service disconnected. Read again to reconnect.");
          }
        };
        try {
          session = new window.lib_session.Session();
          session.open("websocket", "127.0.0.1", token, state, true);
        } catch (error) {
          settled = true;
          clearTimeout(timeout);
          reject(error);
        }
      });
    })();
    try { return await connecting; }
    finally { connecting = null; }
  }
  function settingName() {
    var name = select.value === "custom" ? customName.value.trim() : select.value;
    if (!/^[A-Za-z0-9._-]{1,128}$/.test(name)) {
      throw Error("Select a setting or enter its full name");
    }
    return name;
  }
  function busy(value) {
    readButton.disabled = value;
    saveButton.disabled = value;
    select.disabled = value;
    customName.disabled = value;
  }
  async function read() {
    busy(true);
    try {
      var name = settingName();
      var result = await (await connect()).get(name);
      if (!result || !Object.prototype.hasOwnProperty.call(result, "value")) {
        throw Error("SettingsManager returned no value for " + name);
      }
      input.value = JSON.stringify(result.value);
      message(name + " = " + input.value);
    } catch (error) { message("Read failed: " + errorText(error)); }
    finally { busy(false); }
  }
  async function save() {
    busy(true);
    try {
      var name = settingName();
      var raw = input.value.trim();
      if (!raw || raw.length > 4096) throw Error("Enter a JSON value of at most 4096 characters");
      var value;
      try { value = JSON.parse(raw); }
      catch (_) { throw Error("Invalid JSON value; use true, 30, or \"text\""); }
      await (await connect()).set([{name: name, value: value}]);
      var result = await manager.get(name);
      if (!result || JSON.stringify(result.value) !== JSON.stringify(value)) {
        message("SettingsManager accepted " + name + ", but read-back differs; check it before relying on the change.");
      } else {
        message("Saved and verified " + name + " = " + JSON.stringify(result.value));
      }
    } catch (error) { message("Save failed: " + errorText(error)); }
    finally { busy(false); }
  }
  select.addEventListener("change", function () {
    customName.style.display = select.value === "custom" ? "block" : "none";
    input.value = "";
    status.textContent = "Read the selected setting before changing it.";
  });
  readButton.addEventListener("click", read);
  saveButton.addEventListener("click", save);
})();
