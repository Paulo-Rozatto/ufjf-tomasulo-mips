// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jC2qd":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "890e741a975ef6c8";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"8lqZg":[function(require,module,exports) {
var _interfaceHandlersJs = require("./interface-handlers.js");
var _translatorJs = require("./translator.js");
var _cpuJs = require("./cpu.js");
const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-button");
const textInput = document.querySelector("#codeTextInput");
const fileInput = document.querySelector("#codeFileInput");
const textOutput = document.querySelector("#codeTextOutput");
const sideOutput = document.querySelector("#output");
const upModal = document.querySelector("#uploadModal");
const saveButton = document.querySelector("#saveButton");
const downModal = document.querySelector("#downloadModal");
const downloadButton = document.querySelector("#downloadButton");
const reset = document.querySelector("#reset");
const run = document.querySelector("#run");
const pause = document.querySelector("#pause");
const foward = document.querySelector("#foward");
const INTERVAL_TIME = 1500; // ms
let interval;
let code = `fld $1, 16($12)
fsd $1, 8($0)
fmul $6, $1, $5
fdiv $7, $5, $1
fadd $2, $1, $5
fsub $3, $2, $5
fadd $4, $3, $5
fadd $5, $4, $5`;
// cpu setup
_cpuJs.setUICallbacks({
    issue: (0, _interfaceHandlersJs.issue),
    execute: (0, _interfaceHandlersJs.execute),
    writeBack: (0, _interfaceHandlersJs.writeBack)
});
foward.onclick = ()=>{
    (0, _interfaceHandlersJs.clearActive)();
    _cpuJs.step();
};
reset.onclick = ()=>{
    (0, _interfaceHandlersJs.init)();
    (0, _interfaceHandlersJs.clearActive)();
    _cpuJs.reset();
};
run.onclick = ()=>{
    (0, _interfaceHandlersJs.clearActive)();
    _cpuJs.step();
    interval = setInterval(()=>{
        (0, _interfaceHandlersJs.clearActive)();
        _cpuJs.step();
    }, INTERVAL_TIME);
};
pause.onclick = ()=>{
    clearInterval(interval);
};
// handle menu visibility
menuBtn.onclick = ()=>{
    menu.classList.toggle("menu-visible");
    menu.classList.toggle("menu-hidden");
};
fileInput.onchange = ()=>{
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (event)=>{
        const result = event.target.result;
        textInput.innerHTML = result;
    };
    reader.readAsText(file);
};
saveButton.onclick = ()=>{
    code = textInput.value.toString().trim();
    if (/[a-z]/.test(code)) code = code.split("\n").map((e)=>(0, _translatorJs.assemblyToBin)(e));
    else code = code.split("\n");
    (0, _interfaceHandlersJs.setInstructions)(code);
    _cpuJs.setInstructions(code);
};
upModal.addEventListener("show.bs.modal", ()=>{
    fileInput.value = "";
    textInput.value = typeof code === "string" ? code : code.join("\n");
});
// handle output
downModal.addEventListener("show.bs.modal", ()=>textOutput.value = sideOutput.value) // put code in output when modal is opened
;
downloadButton.onclick = (event)=>{
    let blob = new Blob([
        textOutput.value
    ], {
        type: "text/plain"
    });
    event.target.download = "resultado.txt";
    event.target.href = window.URL.createObjectURL(blob);
};

},{"./interface-handlers.js":"9UFrG","./translator.js":"bcTfO","./cpu.js":"eCIl8"}],"eCIl8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setInstructions", ()=>setInstructions);
parcelHelpers.export(exports, "setUICallbacks", ()=>setUICallbacks);
parcelHelpers.export(exports, "step", ()=>step);
parcelHelpers.export(exports, "reset", ()=>reset);
var _componentsJs = require("./components.js");
var _issueJs = require("./stages/issue.js");
var _executeJs = require("./stages/execute.js");
var _writebackJs = require("./stages/writeback.js");
var _interfaceHandlersJs = require("./interface-handlers.js");
const memory = new ArrayBuffer(512); // memory size in bytes
const memView = new Float64Array(memory); // view memory as 64-bit floats as we are working only with doubles
const registers = new Float64Array(32); // 16 registers, each one 64-bit float
const regStats = new Uint8Array(32); // 16 registers, each one 8-bit unsigned integer
let commands = [];
let ui = {
    issue: ()=>{},
    execute: ()=>{},
    writeBack: ()=>{}
};
(0, _issueJs.issue).init((0, _componentsJs.instructions), (0, _componentsJs.operations), (0, _componentsJs.stations), regStats, registers, (0, _componentsJs.loadStoreQueue), (0, _componentsJs.pc), (0, _componentsJs.clock));
(0, _executeJs.execute).init((0, _componentsJs.adder), (0, _componentsJs.multiplier), (0, _componentsJs.stations), registers, (0, _componentsJs.loadStoreQueue), memView, (0, _componentsJs.cdb));
(0, _writebackJs.writeBack).init((0, _componentsJs.stations), registers, regStats, memView, (0, _componentsJs.loadStoreQueue), (0, _componentsJs.cdb));
function setInstructions(_commands) {
    commands = _commands;
    const binaryInstructions = _commands.map((command)=>parseInt(command, 2));
    (0, _componentsJs.instructions).set(binaryInstructions);
}
function setUICallbacks(callbacks) {
    ui = {
        ...ui,
        ...callbacks
    };
}
function step() {
    let outPC = (0, _componentsJs.pc).get();
    let outClock = (0, _componentsJs.clock).get();
    (0, _issueJs.issue).read();
    (0, _executeJs.execute).read();
    (0, _writebackJs.writeBack).read();
    (0, _issueJs.issue).write(ui.issue);
    (0, _executeJs.execute).write(ui.execute);
    (0, _writebackJs.writeBack).write(ui.writeBack);
    (0, _interfaceHandlersJs.updateOutput)(outPC, outClock, (0, _componentsJs.instructions).get(outPC), (0, _componentsJs.stations), registers, memView);
}
function reset() {
    (0, _componentsJs.pc).reset();
    (0, _componentsJs.clock).reset();
    setInstructions(commands);
    (0, _componentsJs.loadStoreQueue).reset();
    memView[2] = 2;
    (0, _interfaceHandlersJs.updateMemory)(2, 2);
    registers[1] = 1.1;
    registers[5] = 5.5;
    (0, _interfaceHandlersJs.updateRegisters)([
        {
            id: 1,
            value: 1.1
        },
        {
            id: 5,
            value: 5
        }
    ]);
    (0, _componentsJs.resetStations)();
}
memView[2] = 2;
(0, _interfaceHandlersJs.updateMemory)(2, 2);
registers[1] = 1.1;
registers[5] = 5.5;
(0, _interfaceHandlersJs.updateRegisters)([
    {
        id: 1,
        value: 1.1
    },
    {
        id: 5,
        value: 5
    }
]);

},{"./components.js":"lxTDW","./stages/issue.js":"crfeJ","./stages/execute.js":"knS07","./stages/writeback.js":"iWbg1","./interface-handlers.js":"9UFrG","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"crfeJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "issue", ()=>issue);
var _components = require("../components");
let instructions, operations, stations, regStats, registers, pc, clock, loadStoreQueue;
function init(_instructions, _operations, _stations, _regStats, _registers, _loadStoreQueue, _pc, _clock) {
    instructions = _instructions;
    operations = _operations;
    stations = _stations;
    regStats = _regStats;
    registers = _registers;
    loadStoreQueue = _loadStoreQueue;
    pc = _pc;
    clock = _clock;
}
let instruction, opcode, funct, operation, station, params;
function read() {
    instruction = instructions.get(pc.get());
    opcode = instruction & 127; // [6-0]
    funct = instruction >> 12 & 7 // [14-12]
    ;
    operation = operations[opcode];
    if (!operation) {
        console.warn("operation not found");
        return;
    }
    if (opcode == (0, _components.TYPES).R) operation = operation[funct];
    station = stations[operation.station].find((station)=>!station.busy);
    params = operations[opcode].getParams(instruction);
}
function write(uiCall) {
    clock.next();
    uiCall(null, null, clock);
    if (!operation) return;
    if (!station) {
        console.warn("stall");
        return;
    }
    if (opcode == (0, _components.TYPES).R) writeR();
    else writeIS();
    pc.next();
    uiCall(station, pc, clock);
}
function writeR() {
    if (!station) {
        console.warn("stall");
        return;
    }
    const { rs1 , rs2 , rd  } = params;
    if (regStats[rs1] != 0) station.qj = regStats[rs1];
    else {
        station.vj = registers[rs1];
        station.qj = 0;
    }
    if (regStats[rs2] != 0) station.qk = regStats[rs2];
    else {
        station.vk = registers[rs2];
        station.qk = 0;
    }
    station.busy = true;
    station.op = operation.op;
    station.opName = operation.name;
    station.cicles = operation.cicles;
    regStats[rd] = station.id;
}
function writeIS() {
    if (!station) {
        console.warn("stall");
        return;
    }
    const { rs1 , rs2 , rd , imm  } = params;
    let rs, r;
    if (opcode == (0, _components.TYPES).I) {
        rs = rs1;
        r = rd;
    } else {
        rs = rs2;
        r = rs1;
    }
    if (regStats[rs] != 0) station.qj = regStats[rs];
    else {
        station.vj = registers[rs];
        station.qj = 0;
    }
    regStats[r] = station.id;
    station.busy = true;
    station.op = operation.op;
    station.opName = operation.name;
    station.cicles = operation.cicles;
    station.vk = imm;
    loadStoreQueue.push(station);
}
const issue = {
    init,
    read,
    write
};

},{"../components":"lxTDW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"knS07":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "execute", ()=>execute);
var _components = require("../components");
let adder, multiplier, stations, registers, memory, cdb, loadStoreQueue;
function init(_adder, _multiplier, _stations, _registers, _loadStoreQueue, _memory, _cdb) {
    adder = _adder;
    multiplier = _multiplier;
    stations = _stations;
    registers = _registers;
    loadStoreQueue = _loadStoreQueue;
    memory = _memory;
    cdb = _cdb;
}
let adderStation, multiplierStation, buffer;
function read() {
    adderStation = stations[0, _components.ADD_RS].find((station)=>station.busy && station.qj == 0 && station.qk == 0);
    multiplierStation = stations[0, _components.MUL_RS].find((station)=>station.busy && station.qj == 0 && station.qk == 0);
    const head = loadStoreQueue.head();
    buffer = head.busy && head.qj == 0 && head.qk == 0 ? head : null;
}
let adderUi, multiplierUi, stationUi; // referefences to adder and station if they are to be updated in the ui
function write(uiCall) {
    adderUi = null;
    multiplierUi = null;
    stationUi = null;
    if (adder.busy) {
        if (!adder.ready) {
            adder.station.cicles--;
            adderUi = adder;
            if (adder.station.cicles == 0) {
                adder.ready = true;
                adder.result = adder.station.op(adder.station.vj, adder.station.vk);
            }
        }
        if (adder.ready && cdb.busy == false) {
            cdb.busy = true;
            cdb.result = adder.result;
            cdb.station = adder.station;
            adder.busy = false;
            adder.ready = false;
            adder.station.busy = false;
        }
    } else if (adderStation) {
        adder.busy = true;
        adder.ready = false;
        adder.station = adderStation;
        adderUi = adder;
    }
    if (multiplier.busy) {
        if (!multiplier.ready) {
            multiplier.station.cicles--;
            multiplierUi = multiplier;
            if (multiplier.station.cicles == 0) {
                multiplier.ready = true;
                multiplier.result = multiplier.station.op(multiplier.station.vj, multiplier.station.vk);
            }
        }
        if (multiplier.ready && cdb.busy == false) {
            cdb.busy = true;
            cdb.result = multiplier.result;
            cdb.station = multiplier.station;
            multiplier.busy = false;
            multiplier.ready = false;
            multiplier.station.busy = false;
        }
    } else if (multiplierStation) {
        multiplier.busy = true;
        multiplier.ready = false;
        multiplier.station = multiplierStation;
        multiplierUi = multiplier;
    }
    if (buffer) {
        if (!buffer.ready) {
            buffer.cicles--;
            if (buffer.cicles === 0) {
                buffer.ready = true;
                buffer.vk = buffer.op(buffer.vj, buffer.vk, registers, memory);
            }
        }
        if (buffer.opName === "fld") {
            if (buffer.ready && cdb.busy == false) {
                cdb.busy = true;
                cdb.result = buffer.vk;
                cdb.station = buffer;
                buffer.busy = false;
                buffer.ready = false;
                stationUi = buffer;
                loadStoreQueue.pop();
            }
        } else if (buffer.ready) stationUi = buffer;
    }
    uiCall(adderUi, multiplierUi, stationUi);
}
const execute = {
    init,
    read,
    write
};

},{"../components":"lxTDW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iWbg1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "writeBack", ()=>writeBack);
var _interfaceHandlers = require("../interface-handlers");
let stations, registers, regStats, memory, loadStoreQueue, cdb;
function init(_stations, _registers, _regStats, _memory, _loadStoreQueue, _cdb) {
    stations = _stations;
    registers = _registers;
    regStats = _regStats;
    memory = _memory;
    loadStoreQueue = _loadStoreQueue;
    cdb = _cdb;
}
let station, result, busy, stats, head;
function read() {
    busy = cdb.busy;
    result = cdb.result;
    station = {
        ...cdb.station
    }; // copy object
    stats = [
        ...regStats
    ];
    head = {
        ...loadStoreQueue.head()
    };
}
function write(uiCall) {
    const uiStations = new Set();
    const uiRegisters = new Set();
    if (busy) {
        stats.forEach((stat, i)=>{
            if (stat == station.id) {
                registers[i] = result;
                regStats[i] = 0;
                uiRegisters.add({
                    id: i,
                    value: result
                });
            }
        });
        const allStations = Object.values(stations).flatMap((e)=>e);
        allStations.forEach((rs)=>{
            if (rs.qj == station.id) {
                rs.qj = 0;
                rs.vj = result;
                uiStations.add(rs);
            }
            if (rs.qk == station.id) {
                rs.qk = 0;
                rs.vk = result;
                uiStations.add(rs);
            }
        });
        cdb.result = 0;
        cdb.station = null;
        cdb.busy = false;
        uiStations.add(station);
    }
    if (head && head.ready && head.opName === "fsd") {
        const address = head.vk >> 3; // memview has 8 bytes per line
        memory[address] = head.vj;
        head.busy = false;
        head.ready = false;
        loadStoreQueue.pop();
        uiStations.add(head);
        (0, _interfaceHandlers.updateMemory)(address, head.vj);
    }
    uiCall(uiStations, uiRegisters);
}
const writeBack = {
    init,
    read,
    write
};

},{"../interface-handlers":"9UFrG","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["jC2qd","8lqZg"], "8lqZg", "parcelRequireccd2")

//# sourceMappingURL=index.975ef6c8.js.map
