(function () {
  "use strict";

  var UPDATE_URL = "https://Garbagebuild.github.io/JScalated-Store/Apps-directory/OStore/update.webmanifest";
  var SCRIPT_BASE = new URL(".", document.currentScript.src).href;
  var root = document.getElementById("ostore-installer");
  if (root) { root.style.display = "block"; return; }

  root = document.createElement("div");
  root.id = "ostore-installer";
  root.innerHTML = [
    '<style>',
    '#ostore-installer{position:fixed;z-index:2147483647;inset:0;overflow:auto;background:#07111f;color:#e2e8f0;font:14px Arial,sans-serif}',
    '#ostore-installer *{box-sizing:border-box}',
    '#ostore-installer .wrap{max-width:580px;margin:auto;padding:15px}',
    '#ostore-installer h1{color:#38bdf8;font-size:24px}',
    '#ostore-installer p{line-height:1.4}',
    '#ostore-installer .panel{background:#0b1728;border:1px solid #20324a;border-radius:11px;padding:13px}',
    '#ostore-installer button{width:100%;margin:8px 0;padding:12px;border:0;border-radius:7px;background:#22c55e;color:#020617;font-weight:bold}',
    '#ostore-installer button.secondary{background:#334155;color:#fff}',
    '#ostore-installer .warning{color:#fca5a5}',
    '#ostore-installer pre{min-height:95px;white-space:pre-wrap;word-break:break-word;background:#020617;color:#22c55e;padding:10px;border-radius:7px;font:11px monospace}',
    '</style>',
    '<div class="wrap"><h1>Install OStore</h1>',
    '<div class="panel"><p>JScalated will install OStore through KaiOS AppsManager.</p>',
    '<p class="warning">The supplied package tool does not produce a valid cryptographic signature. Installation depends on this device accepting the package.</p>',
    '<button id="ostore-retry" type="button">Retry installation</button>',
    '<button id="ostore-close" class="secondary" type="button">Close</button></div>',
    '<pre id="ostore-log" role="status" aria-live="polite">Starting…</pre></div>'
  ].join("");
  (document.body || document.documentElement).appendChild(root);

  var logNode = document.getElementById("ostore-log");
  var retry = document.getElementById("ostore-retry");
  var busy = false;
  var client = null;

  function log(message) {
    logNode.textContent += "\n" + message;
    logNode.scrollTop = logNode.scrollHeight;
  }

  function callUrlMethod(manager, method, url, rest) {
    var address = new URL(String(url)).href;
    var args = rest || [];
    var requests = {
      installPackage: ["InstallPackageRequest", "updateUrl"],
      checkForUpdate: ["CheckForUpdateRequest", "updateUrl"],
      update: ["UpdateRequest", "manifestUrl"]
    };
    var request = requests[method];
    var codec = request && manager.wrapper_payload_message &&
      manager.wrapper_payload_message[request[0]];
    function accepts(value) {
      if (!codec || typeof codec.encode !== "function") { return false; }
      var payload = {};
      payload[request[1]] = value;
      if (method === "checkForUpdate") { payload.appsOption = args[0]; }
      try { codec.encode(payload); return true; }
      catch (_) { return false; }
    }
    function call(value) {
      return Promise.resolve().then(function () {
        return manager[method].apply(manager, [value].concat(args));
      });
    }
    var first = codec && !accepts(address) && accepts(new URL(address)) ?
      new URL(address) : address;
    return call(first).catch(function (error) {
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

  function remoteUpdateUrl(app) {
    try { return new URL(String((app && (app.updateURL || app.updateUrl)) || "")).href; }
    catch (_) { return ""; }
  }

  function isOStore(app) {
    if (!app) { return false; }
    var update = remoteUpdateUrl(app);
    var manifest = String(app.manifestURL || app.manifestUrl || "");
    var origin = String(app.origin || "");
    function hasOStoreHost(value) {
      try { return new URL(value).hostname === "ostore.localhost"; }
      catch (_) { return false; }
    }
    return update === new URL(UPDATE_URL).href || origin === "ostore" ||
      hasOStoreHost(origin) || hasOStoreHost(manifest) || app.name === "OStore";
  }

  function start() {
    if (busy) { return; }
    busy = true;
    retry.disabled = true;
    log("Connecting to AppsManager…");
    client.connect().then(function (manager) {
      return manager.getAll().then(function (apps) {
        var existing = (apps || []).filter(isOStore)[0];
        if (existing && remoteUpdateUrl(existing) === new URL(UPDATE_URL).href &&
            (existing.manifestURL || existing.manifestUrl)) {
          log("OStore is installed from GitHub Pages. Checking for an update…");
          return callUrlMethod(manager, "checkForUpdate", UPDATE_URL,
            [{ autoInstall: false }]).then(function (available) {
            if (!available) {
              log("OStore is already installed and up to date at its GitHub update URL.");
              return null;
            }
            log("Updating OStore…");
            return callUrlMethod(manager, "update",
              existing.manifestURL || existing.manifestUrl);
          });
        }
        if (existing) { log("OStore uses another update URL. Trying the GitHub source; a one-time migration may be required."); }
        log("Installing OStore from " + UPDATE_URL);
        return callUrlMethod(manager, "installPackage", UPDATE_URL);
      });
    }).then(function (result) {
      if (result) { log("OStore installed or updated. Open it from the app list."); }
    }).catch(function (error) {
      log("Install failed: " + window.JScalatedAppsManager.errorText(error));
    }).then(function () {
      busy = false;
      retry.disabled = false;
    });
  }

  function loadClient() {
    if (window.JScalatedAppsManager) {
      client = new window.JScalatedAppsManager(log);
      client.onEvent = function (name, event) {
        if (name === "APP_DOWNLOAD_FAILED_EVENT") {
          log("Download failed: " + window.JScalatedAppsManager.errorText(event));
        } else { log(name.replace(/_EVENT$/, "")); }
      };
      start();
      return;
    }
    var script = document.createElement("script");
    script.src = new URL("appsmanager.js", SCRIPT_BASE).href;
    script.onload = loadClient;
    script.onerror = function () { log("Could not load AppsManager helper script."); };
    (document.head || document.documentElement).appendChild(script);
  }

  retry.onclick = function () { if (client) { start(); } else { loadClient(); } };
  document.getElementById("ostore-close").onclick = function () { root.style.display = "none"; };
  loadClient();
}());
