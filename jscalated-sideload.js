(function () {
  "use strict";

  var API_ROOT = "http://127.0.0.1/api/v1/";
  /* v2 deliberately ignores the old shared /update.manifest value. */
  var STORAGE_KEY = "jscalated.sideload.updateUrl.v2";
  var manager = null;
  var session = null;
  var root = document.getElementById("jscalated-sideload-root");

  if (root) {
    root.style.display = "block";
    return;
  }

  root = document.createElement("div");
  root.id = "jscalated-sideload-root";
  root.innerHTML = [
    '<style>',
    '#jscalated-sideload-root{position:fixed;z-index:2147483647;inset:0;overflow:auto;background:#07111f;color:#e2e8f0;font:14px Arial,sans-serif}',
    '#jscalated-sideload-root *{box-sizing:border-box}',
    '#jscalated-sideload-root .js-wrap{max-width:620px;margin:auto;padding:12px}',
    '#jscalated-sideload-root h1{margin:4px 0;color:#38bdf8;font-size:24px}',
    '#jscalated-sideload-root p{line-height:1.4}',
    '#jscalated-sideload-root label{display:block;margin:12px 0 5px;font-weight:bold}',
    '#jscalated-sideload-root input{width:100%;padding:10px;border:1px solid #38bdf8;border-radius:6px;background:#020617;color:#fff;font:13px monospace}',
    '#jscalated-sideload-root button{width:100%;margin:6px 0;padding:11px;border:0;border-radius:6px;background:#38bdf8;color:#020617;font-weight:bold}',
    '#jscalated-sideload-root button.secondary{background:#334155;color:#fff}',
    '#jscalated-sideload-root button.danger{background:#7f1d1d;color:#fff}',
    '#jscalated-sideload-root button:disabled{cursor:not-allowed;opacity:.42}',
    '#jscalated-sideload-root pre{min-height:110px;max-height:220px;overflow:auto;white-space:pre-wrap;word-break:break-word;background:#020617;color:#22c55e;padding:9px;border:1px solid #1e293b;border-radius:6px;font:11px monospace}',
    '#jscalated-sideload-root .hint{padding:8px;background:#172033;border-radius:6px;color:#cbd5e1}',
    '#jscalated-sideload-root .critical{margin:10px 0;padding:10px;border:1px solid #ef4444;border-radius:7px;background:#450a0a;color:#fee2e2;line-height:1.42}',
    '#jscalated-sideload-root .risk-ack{display:flex;gap:8px;align-items:flex-start;margin:10px 0;padding:9px;border:1px solid #7f1d1d;border-radius:7px;background:#1f0a0a;font-weight:normal}',
    '#jscalated-sideload-root .risk-ack input{width:auto;margin:2px 0 0;flex:0 0 auto}',
    '</style>',
    '<div class="js-wrap">',
    '<h1>JScalated Sideload</h1>',
    '<p>Install a packaged KaiOS app through the AppsManager service. This tool does not use Engmode.</p>',
    '<div class="critical"><strong>Production signature-bypass warning</strong><br>On affected KaiOS firmware, a specially prepared package can be accepted even though its CMS signature is cryptographically invalid. KaiOS accepting a package therefore does <em>not</em> prove who created it or that it is safe. A package can execute code with every permission granted by its manifest. Use this only on a device you own, install only packages whose contents you have independently reviewed, and keep a recovery backup.</div>',
    '<div class="hint">Run the Python helper and enter the short URL it prints, such as <strong>http://192.168.1.2:8080/pa</strong>. Every unrelated app must use a different final ID.</div>',
    '<label for="jss-update-url">Update manifest URL</label>',
    '<input id="jss-update-url" inputmode="url" value="http://192.168.1.2:8080/pa">',
    '<button id="jss-test" type="button">1. Test Package Server</button>',
    '<button id="jss-connect" type="button">2. Connect AppsManager</button>',
    '<label class="risk-ack"><input id="jss-risk-ack" type="checkbox"><span>I understand that this operation may bypass KaiOS package-signature authentication, and I independently trust the package at the URL above.</span></label>',
    '<button id="jss-install" type="button" disabled>3. Install (Signature-Bypass Risk)</button>',
    '<button id="jss-list" class="secondary" type="button">List Installed Apps</button>',
    '<button id="jss-close" class="danger" type="button">Close</button>',
    '<pre id="jss-log">Ready.</pre>',
    '</div>'
  ].join("");
  (document.body || document.documentElement).appendChild(root);

  var urlInput = document.getElementById("jss-update-url");
  var logBox = document.getElementById("jss-log");
  var riskAck = document.getElementById("jss-risk-ack");
  var installButton = document.getElementById("jss-install");
  try {
    urlInput.value = localStorage.getItem(STORAGE_KEY) || urlInput.value;
  } catch (ignore) {}

  function text(value) {
    if (typeof value === "string") {
      return value;
    }
    try {
      return JSON.stringify(value);
    } catch (error) {
      return String(value);
    }
  }

  function log(message) {
    var line = "[" + new Date().toLocaleTimeString() + "] " + text(message);
    try { console.log("JScalated Sideload: " + line); } catch (ignore) {}
    logBox.textContent += "\n" + line;
    logBox.scrollTop = logBox.scrollHeight;
  }

  function normalizeUrl() {
    var value = String(urlInput.value || "").trim();
    if (!/^https?:\/\//i.test(value)) {
      throw new Error("Use a complete http:// or https:// update URL.");
    }
    try {
      value = new URL(value).href;
    } catch (error) {
      throw new Error("Invalid update URL: " + value);
    }
    urlInput.value = value;
    try { localStorage.setItem(STORAGE_KEY, value); } catch (ignore) {}
    return value;
  }

  function loadScript(url) {
    return new Promise(function (resolve, reject) {
      var selector = 'script[data-jss-api="' + url + '"]';
      var script = document.querySelector(selector);
      var timer;
      if (script && script.getAttribute("data-loaded") === "true") {
        resolve();
        return;
      }
      script = script || document.createElement("script");
      script.setAttribute("data-jss-api", url);
      timer = setTimeout(function () {
        reject(new Error("Timed out loading " + url));
      }, 10000);
      script.onload = function () {
        clearTimeout(timer);
        script.setAttribute("data-loaded", "true");
        resolve();
      };
      script.onerror = function () {
        clearTimeout(timer);
        reject(new Error("Failed to load " + url));
      };
      if (!script.parentNode) {
        script.src = url;
        (document.head || document.documentElement).appendChild(script);
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
    urls.forEach(function (url) {
      chain = chain.then(function () {
        return loadScript(url);
      });
    });
    return chain;
  }

  function getToken() {
    try {
      if (navigator.b2g && navigator.b2g.externalapi &&
          typeof navigator.b2g.externalapi.getToken === "function") {
        return Promise.resolve(navigator.b2g.externalapi.getToken());
      }
    } catch (error) {
      log("Token API unavailable: " + error);
    }
    return Promise.resolve("secrettoken");
  }

  function enumName(value) {
    var source = window.lib_apps && window.lib_apps.AppsServiceError;
    var keys;
    var i;
    if (!source || typeof value !== "number") {
      return "";
    }
    try {
      keys = Object.keys(source);
      for (i = 0; i < keys.length; i += 1) {
        if (source[keys[i]] === value) {
          return keys[i];
        }
      }
    } catch (ignore) {}
    return "";
  }

  function describeError(error) {
    var value = error && error.value;
    var code = typeof value === "number" ? value :
      (value && typeof value.error === "number" ? value.error : null);
    var parts = [];
    if (code !== null) {
      parts.push("code=" + code + (enumName(code) ? " (" + enumName(code) + ")" : ""));
    }
    if (error && error.reason) { parts.push("reason=" + text(error.reason)); }
    if (error && error.message) { parts.push("message=" + error.message); }
    if (value !== undefined && typeof value !== "number") { parts.push("value=" + text(value)); }
    return parts.length ? parts.join("; ") : text(error);
  }

  function callInstallPackage(value, url) {
    var address = new URL(String(url)).href;
    var codec = value.wrapper_payload_message &&
      value.wrapper_payload_message.InstallPackageRequest;
    function accepts(candidate) {
      if (!codec || typeof codec.encode !== "function") { return false; }
      try { codec.encode({ updateUrl: candidate }); return true; }
      catch (_) { return false; }
    }
    function call(first) {
      return Promise.resolve().then(function () { return value.installPackage(first); });
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

  function observeEvents(value) {
    var eventNames = [
      "APP_INSTALLING_EVENT",
      "APP_INSTALLED_EVENT",
      "APP_DOWNLOAD_FAILED_EVENT"
    ];
    eventNames.forEach(function (name) {
      var eventId = value[name];
      if (eventId === undefined || typeof value.addEventListener !== "function") {
        return;
      }
      value.addEventListener(eventId, function (event) {
        log(name + ": " + text(event));
      });
    });
  }

  function connect() {
    if (manager) {
      return Promise.resolve(manager);
    }
    log("Loading AppsManager client libraries...");
    return loadAppsApi().then(getToken).then(function (token) {
      return new Promise(function (resolve, reject) {
        var settled = false;
        var timer = setTimeout(function () {
          if (!settled) {
            settled = true;
            reject(new Error("Timed out connecting to AppsManager."));
          }
        }, 12000);
        var state = {
          onsessionconnected: function () {
            window.lib_apps.AppsManager.get(session).then(function (value) {
              if (settled) { return; }
              settled = true;
              clearTimeout(timer);
              manager = value;
              observeEvents(manager);
              log("AppsManager connected.");
              resolve(manager);
            }, function (error) {
              if (!settled) {
                settled = true;
                clearTimeout(timer);
                reject(error);
              }
            });
          },
          onsessiondisconnected: function () {
            manager = null;
            session = null;
            log("AppsManager session disconnected.");
          }
        };
        try {
          session = new window.lib_session.Session();
          session.open("websocket", "localhost", token || "secrettoken", state, true);
        } catch (error) {
          settled = true;
          clearTimeout(timer);
          reject(error);
        }
      });
    });
  }

  function testServer() {
    var updateUrl;
    try {
      updateUrl = normalizeUrl();
    } catch (error) {
      log(error.message);
      return;
    }
    log("Fetching " + updateUrl);
    fetch(updateUrl, { cache: "no-store" }).then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }
      return response.json();
    }).then(function (manifest) {
      log("Server OK: name=" + manifest.name +
        ", package=" + manifest.package_path +
        ", bytes=" + manifest.packaged_size);
    }).catch(function (error) {
      log("Package server test failed: " + describeError(error));
    });
  }

  function install() {
    var updateUrl;
    if (!riskAck.checked) {
      log("Install blocked: read and acknowledge the production signature-bypass warning first.");
      return;
    }
    try {
      updateUrl = normalizeUrl();
    } catch (error) {
      log(error.message);
      return;
    }
    if (!window.confirm(
      "Install from " + updateUrl + "?\n\n" +
      "KaiOS may accept a cryptographically invalid package signature. " +
      "Continue only if you independently trust this package."
    )) {
      log("Installation canceled at the signature-bypass warning.");
      return;
    }
    connect().then(function (value) {
      log("Calling installPackage(" + updateUrl + ")...");
      return callInstallPackage(value, updateUrl);
    }).then(function (app) {
      log("INSTALL SUCCESS: " + text(app));
    }).catch(function (error) {
      var detail = describeError(error);
      log("INSTALL FAILED: " + detail);
      if (/REINSTALL_FORBIDDEN/i.test(detail)) {
        log("That app is already installed/protected, or its URL belongs to another app. Restart the helper with a different short --id for unrelated packages.");
      }
      if (/INVALID_(APP_NAME|ORIGIN)/i.test(detail)) {
        log("The update manifest and ZIP disagree, or an installed app already owns that name/origin. Use a new app name and b2g_features.origin.");
      }
      log("Common causes: invalid ZIP layout, manifest mismatch, missing signature, or unreachable package URL.");
    });
  }

  function listApps() {
    connect().then(function (value) {
      return value.getAll();
    }).then(function (apps) {
      var names = [];
      (apps || []).forEach(function (app) {
        names.push(app.name || app.manifestUrl || "unnamed");
      });
      log("Installed apps (" + names.length + "): " + names.join(", "));
    }).catch(function (error) {
      log("List failed: " + describeError(error));
    });
  }

  document.getElementById("jss-test").onclick = testServer;
  document.getElementById("jss-connect").onclick = function () {
    connect().catch(function (error) {
      log("AppsManager connection failed: " + describeError(error));
    });
  };
  riskAck.onchange = function () {
    installButton.disabled = !riskAck.checked;
  };
  installButton.onclick = install;
  document.getElementById("jss-list").onclick = listApps;
  document.getElementById("jss-close").onclick = function () {
    root.style.display = "none";
  };
  log("SECURITY: affected KaiOS versions may accept packages with invalid production CMS signatures. Package acceptance is not proof of authenticity.");
}());
