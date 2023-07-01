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
})({"VSvVG":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "47a49365f4285c13";
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

},{}],"9UFrG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "init", ()=>init);
parcelHelpers.export(exports, "clearActive", ()=>clearActive);
parcelHelpers.export(exports, "setInstructions", ()=>setInstructions);
parcelHelpers.export(exports, "updateRegisters", ()=>updateRegisters);
parcelHelpers.export(exports, "updateMemory", ()=>updateMemory);
parcelHelpers.export(exports, "issue", ()=>issue);
parcelHelpers.export(exports, "execute", ()=>execute);
parcelHelpers.export(exports, "writeBack", ()=>writeBack);
parcelHelpers.export(exports, "updateOutput", ()=>updateOutput);
var _translator = require("./translator");
var _components = require("./components");
const instructions = document.querySelector("#instructions-list");
const memory = document.querySelector("#memory-list");
const registers = document.querySelector("#registers-list");
const storeBuffer = document.querySelector("#store-buffer-list");
const loadBuffer = document.querySelector("#load-buffer-list");
const rsAdd = document.querySelector("#rs-fadd");
const rsMult = document.querySelector("#rs-fmult");
const adder = document.querySelector("#adder");
const pc = document.querySelector("#pc");
const clock = document.querySelector("#clock");
const output = document.querySelector("#output");
const activeList = new Set();
function newSingleCell(id, instruction) {
    const li = document.createElement("li");
    li.id = id;
    li.classList = "list-group-item text-center";
    li.innerText = instruction;
    li.title = (0, _translator.binToAssembly)(instruction);
    return li;
}
function newDoubleCell(id, val1, val2) {
    const li = document.createElement("li");
    li.id = id;
    li.classList.add("list-group-item");
    li.innerHTML = `
    <strong class="float-start">${val1}:</strong>
    <span class="float-end">${val2}</span>`;
    return li;
}
function newStationCell(id) {
    const li = document.createElement("li");
    li.classList = "list-group-item d-inline-flex justify-content-between";
    li.id = id;
    li.innerHTML = `
    <strong title="status">free</strong>
    <span title="command">oooo</span>
    <span title="Vj">0.00</span>
    <span title="Vk">0.00</span>
    <span title="Qj">0.00</span>
    <span title="Qk">0.00</span>`;
    return li;
}
function init() {
    instructions.innerHTML = "";
    memory.innerHTML = "";
    registers.innerHTML = "";
    storeBuffer.innerHTML = "";
    loadBuffer.innerHTML = "";
    rsAdd.innerHTML = "";
    rsMult.innerHTML = "";
    pc.innerText = "00";
    clock.innerText = "00";
    const zero32 = "0".repeat(32);
    const address = (i)=>"0x" + (i * 8).toString(16).padStart(3, "0");
    const reg = (i)=>"$" + i.toString(10).padStart(2, "0");
    for(let i = 0; i < 64; i++){
        const li = newDoubleCell(`mem-${i}`, address(i), zero32);
        memory.appendChild(li);
    }
    for(let i = 0; i < 32; i++){
        const li = newDoubleCell(`reg-${i}`, reg(i), zero32);
        registers.appendChild(li);
    }
    for(let i = 1; i <= 3; i++){
        const li = newStationCell(`rs-${i}`);
        rsAdd.appendChild(li);
    }
    for(let i = 4; i <= 5; i++){
        const li = newStationCell(`rs-${i}`);
        rsMult.appendChild(li);
    }
    for(let i = 6; i <= 9; i++){
        const li = newSingleCell(`fld-${i}`, zero32);
        loadBuffer.appendChild(li);
    }
    for(let i = 10; i <= 14; i++){
        const li = newDoubleCell(`fsd-${i}`, address(0), zero32);
        storeBuffer.appendChild(li);
    }
    for(let i = 1; i <= 3; i++){
        const li = newSingleCell(`ins-${i}`, zero32);
        instructions.appendChild(li);
    }
}
function setActive(li, offset = -1) {
    li.classList.add("active");
    if (offset < 0) {
        offset = li.id.split("-")[1];
        offset = parseInt(offset) - 1;
    }
    li.parentElement.scrollTo({
        top: li.clientHeight * offset,
        behavior: "smooth"
    });
    activeList.add(li);
}
function clearActive() {
    activeList.forEach((li)=>li.classList.remove("active"));
    activeList.clear();
}
function setInstructions(commands) {
    const fragment = document.createDocumentFragment();
    instructions.innerHTML = "";
    for(let i = 0; i < commands.length; i++){
        const instruction = commands[i];
        const id = `ins-${i + 1}`;
        const li = newSingleCell(id, instruction);
        fragment.appendChild(li);
    }
    instructions.appendChild(fragment);
}
function updateLoadBuffer(station) {
    const id = `fld-${station.id}`;
    const li = document.getElementById(id);
    li.innerText = station.vk.toString(2).padStart(32, "0");
    setActive(li);
}
function updateStoreBuffer(station) {
    const id = `fsd-${station.id}`;
    const li = document.getElementById(id);
    li.children[0].innerText = "0x" + station.vk.toString(16).padStart(3, "0");
    li.children[1].innerText = station.vj.toString(2).padStart(32, "0");
    li.children[1].title = station.vj.toFixed(2);
    setActive(li, station.id - 10);
}
function updateStation(station) {
    if (station.opName === "fld") {
        updateLoadBuffer(station);
        return;
    }
    if (station.opName === "fsd") {
        updateStoreBuffer(station);
        return;
    }
    const id = `rs-${station.id}`;
    const rs = document.getElementById(id);
    rs.innerHTML = `
    <strong title="status">${station.busy ? "busy" : "free"}</strong>
    <span title="command">${station.opName}</span>
    <span title="Vj">${station.vj.toFixed(2)}</span>
    <span title="Vk">${station.vk.toFixed(2)}</span>
    <span title="Qj">${station.qj.toFixed(2)}</span>
    <span title="Qk">${station.qk.toFixed(2)}</span>`;
    setActive(rs);
}
function updateAdder(_adder) {
    if (!_adder.station) return;
    const rsId = `rs#${_adder.station.id}`;
    const cycles = _adder.station.cicles.toString().padStart(2, "0");
    adder.innerHTML = `
    <strong title="status">${_adder.busy ? "busy" : "free"}</strong>
    <span title="id da station">${rsId}</span>
    <span title="Vk">${cycles} cycles</span>`;
    setActive(adder);
}
function updateMultiplier(_multiplier) {
    if (!_multiplier.station) return;
    const rsId = `rs#${_multiplier.station.id}`;
    const cycles = _multiplier.station.cicles.toString().padStart(2, "0");
    multiplier.innerHTML = `
    <strong title="status">${_multiplier.busy ? "busy" : "free"}</strong>
    <span title="id da station">${rsId}</span>
    <span title="Vk">${cycles} cycles</span>`;
    setActive(multiplier);
}
function updateRegisters(registers) {
    registers.forEach((reg)=>{
        let { id , value  } = reg;
        const li = document.getElementById(`reg-${id}`);
        li.title = value.toFixed(2);
        li.lastElementChild.innerText = value.toString(2).slice(0, 31).padStart(32, "0") + "...";
        setActive(li);
    });
}
function updateMemory(address, value) {
    const li = document.getElementById(`mem-${address}`);
    li.title = value.toFixed(2);
    li.lastElementChild.innerText = value.toString(2).slice(0, 31).padStart(32, "0") + "...";
    setActive(li);
}
function issue(station, _pc, _clock) {
    clock.innerText = _clock.get().toString().padStart(2, "0");
    if (_pc) {
        pc.innerText = _pc.get().toString().padStart(2, "0");
        let insIdx = (_pc.get() >> 2) - 1;
        setActive(instructions.children[insIdx]);
    }
    if (station) updateStation(station);
}
function execute(adder, multiplier1, station) {
    if (adder) updateAdder(adder);
    if (multiplier1) updateMultiplier(multiplier1);
    if (station) updateStation(station);
}
function writeBack(stations, registers) {
    stations.forEach((station)=>updateStation(station));
    updateRegisters(registers);
}
function updateOutput(pc, clock, instruction, stations, registers, memory) {
    const ins = instruction ? instruction.toString(2).padStart(32, "0") : "-";
    const binary = instruction ? (0, _translator.binToAssembly)(ins) : "-";
    const adds = stations[0, _components.ADD_RS].map((rs)=>`- ${rs.id.toString().padStart(2, "0")}: ${rs.busy ? rs.opName : "free"}`).join("\n");
    const mults = stations[0, _components.MUL_RS].map((rs)=>`- ${rs.id.toString().padStart(2, "0")}: ${rs.busy ? rs.opName : "free"}`).join("\n");
    const outText = `___________________________

Ciclo: ${clock.toString().padStart(2, "0")}
PC: ${pc.toString().padStart(2, "0")}
Instrução: ${ins}
Assembly: ${binary}
Estações de Adição:
${adds}
Estações de Multiplicação:
${mults}
Registradores: 
${[
        ...registers
    ].map((r, i)=>`- $${i.toString().padStart(2, "0")}: ${r.toFixed(2)}`).join("\n")}
Memória:
${[
        ...memory
    ].map((m, i)=>`- 0x${(i * 8).toString(16).padStart(3, "0")}: ${m.toFixed(2)}`).join("\n")}

`;
    let scrollHeight = output.scrollHeight;
    output.value += outText;
    if (clock > 0) output.scrollTo({
        top: scrollHeight,
        behavior: "smooth"
    });
}
init();

},{"./translator":"bcTfO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./components":"lxTDW"}],"bcTfO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "binToAssembly", ()=>binToAssembly);
parcelHelpers.export(exports, "assemblyToBin", ()=>assemblyToBin);
var _components = require("./components");
function regToBin(register, size = 5) {
    let number = parseInt(register.replace("$", ""));
    return number.toString(2).padStart(size, "0");
}
function binToAssembly(instruction) {
    instruction = parseInt(instruction, 2);
    const opcode = instruction & 127; // [6-0]
    const funct = instruction >> 12 & 7 // [14-12]
    ;
    if (opcode === 0) return "nop";
    let op = (0, _components.operations)[opcode];
    const params = op.getParams(instruction);
    switch(opcode){
        case (0, _components.TYPES).R:
            op = op[funct];
            return `${op.name} $${params.rd}, $${params.rs1}, $${params.rs2}`;
        case (0, _components.TYPES).I:
            return `${op.name} $${params.rd}, ${params.imm}($${params.rs1})`;
        case (0, _components.TYPES).S:
            return `${op.name} $${params.rs2}, ${params.imm}($${params.rs1})`;
    }
    if (opcode === (0, _components.TYPES).R) {
        op = op[funct];
        return `${op.name} $${params.rd}, $${params.rs1}, $${params.rs2}`;
    }
    return `${op.name} $${params.rd}, ${params.imm}($${params.rs1})`;
}
function assemblyToBin(assembly) {
    const parts = assembly.split(/\s|\(/).map((e)=>e.replace(",", ""));
    const command = parts[0];
    parts.shift();
    let binParts = parts.map((e)=>regToBin(e));
    let opcode, funct, rs1, rs2, rd, imm;
    switch(command){
        case "fadd":
            opcode = (0, _components.TYPES).R.toString(2).padStart(7, "0");
            funct = "001";
            rd = binParts[0];
            rs1 = binParts[1];
            rs2 = binParts[2];
            return `0000000${rs2}${rs1}${funct}${rd}${opcode}`;
        case "fsub":
            opcode = (0, _components.TYPES).R.toString(2).padStart(7, "0");
            funct = "010";
            rd = binParts[0];
            rs1 = binParts[1];
            rs2 = binParts[2];
            return `0000000${rs2}${rs1}${funct}${rd}${opcode}`;
        case "fmul":
            opcode = (0, _components.TYPES).R.toString(2).padStart(7, "0");
            funct = "011";
            rd = binParts[0];
            rs1 = binParts[1];
            rs2 = binParts[2];
            return `0000000${rs2}${rs1}${funct}${rd}${opcode}`;
        case "fdiv":
            opcode = (0, _components.TYPES).R.toString(2).padStart(7, "0");
            funct = "100";
            rd = binParts[0];
            rs1 = binParts[1];
            rs2 = binParts[2];
            return `0000000${rs2}${rs1}${funct}${rd}${opcode}`;
        case "fld":
            opcode = (0, _components.TYPES).I.toString(2).padStart(7, "0");
            rs1 = binParts[2];
            rd = binParts[0];
            imm = binParts[1].toString(2).padStart(12, "0");
            return `${imm}${rs1}000${rd}${opcode}`;
        case "fsd":
            opcode = (0, _components.TYPES).S.toString(2).padStart(7, "0");
            rs1 = binParts[2];
            rs2 = binParts[0];
            imm = binParts[1].padStart(12, "0");
            return `${imm.slice(0, 7)}${rs2}${rs1}000${imm.slice(7)}${opcode}`;
    }
    return "whatf";
}

},{"./components":"lxTDW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lxTDW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TYPES", ()=>TYPES);
parcelHelpers.export(exports, "ADD_RS", ()=>ADD_RS);
parcelHelpers.export(exports, "MUL_RS", ()=>MUL_RS);
parcelHelpers.export(exports, "FLD_RS", ()=>FLD_RS);
parcelHelpers.export(exports, "FSD_RS", ()=>FSD_RS);
parcelHelpers.export(exports, "cdb", ()=>cdb);
parcelHelpers.export(exports, "pc", ()=>pc);
parcelHelpers.export(exports, "clock", ()=>clock);
parcelHelpers.export(exports, "instructions", ()=>instructions);
parcelHelpers.export(exports, "operations", ()=>operations);
parcelHelpers.export(exports, "stations", ()=>stations);
parcelHelpers.export(exports, "resetStations", ()=>resetStations);
parcelHelpers.export(exports, "adder", ()=>adder);
parcelHelpers.export(exports, "multiplier", ()=>multiplier);
parcelHelpers.export(exports, "loadStoreQueue", ()=>loadStoreQueue);
const TYPES = {
    R: 1,
    I: 2,
    S: 3
};
const ADD_RS = 1;
const MUL_RS = 0;
const FLD_RS = 2;
const FSD_RS = 3;
const cdb = {
    busy: false,
    result: 0,
    station: null
};
const pc = {
    value: 0,
    next () {
        this.value += 4;
    },
    reset () {
        this.value = 0;
    },
    get () {
        return this.value;
    }
};
const clock = {
    value: 0,
    next () {
        this.value += 1;
    },
    reset () {
        this.value = 0;
    },
    get () {
        return this.value;
    }
};
const instructions = {
    _data: [],
    set (data) {
        this._data = data;
    },
    get (byte) {
        return this._data[byte / 4];
    }
};
const operations = {
    1: {
        1: {
            name: "fadd",
            op: (rs1, rs2)=>rs1 + rs2,
            cicles: 1,
            station: ADD_RS
        },
        2: {
            name: "fsub",
            op: (rs1, rs2)=>rs1 - rs2,
            cicles: 1,
            station: ADD_RS
        },
        3: {
            name: "fmul",
            op: (rs1, rs2)=>rs1 * rs2,
            cicles: 10,
            station: MUL_RS
        },
        4: {
            name: "fdiv",
            op: (rs1, rs2)=>rs1 / rs2,
            cicles: 40,
            station: MUL_RS
        },
        getParams: (instruction)=>{
            const rs1 = instruction >> 15 & 31;
            const rs2 = instruction >> 20 & 31;
            const rd = instruction >> 7 & 31;
            return {
                rs1,
                rs2,
                rd
            };
        }
    },
    2: {
        name: "fld",
        op: (rs1, imm, reg, mem)=>mem[reg[rs1] + imm >> 3],
        cicles: 1,
        station: FLD_RS,
        getParams: (instruction)=>{
            const rs1 = instruction >> 15 & 31;
            const rd = instruction >> 7 & 31;
            const imm = instruction >> 20 & 4095;
            return {
                rs1,
                rd,
                imm
            };
        }
    },
    3: {
        name: "fsd",
        op: (rs1, imm, reg)=>reg[rs1] + imm,
        cicles: 1,
        station: FSD_RS,
        getParams: (instruction)=>{
            const rs1 = instruction >> 15 & 31;
            const rs2 = instruction >> 20 & 31;
            const imm = instruction >> 7 & 31 | instruction >> 20 & 131040;
            return {
                rs1,
                rs2,
                imm
            };
        }
    }
};
const station = {
    id: 0,
    busy: 0,
    op: 0,
    opName: "",
    vj: 0,
    vk: 0,
    qj: 0,
    qk: 0,
    cicles: 0
};
const stations = {
    [ADD_RS]: [],
    [MUL_RS]: [],
    [FLD_RS]: [],
    [FSD_RS]: []
};
const resetStations = ()=>{
    for (const stationg of Object.values(stations))stationg.forEach((rs)=>{
        rs.busy = false;
        rs.vj = 0;
        rs.vk = 0;
        rs.qj = 0;
        rs.qk = 0;
        rs.cicles = 0;
    });
};
for(let i = 1; i <= 3; i++){
    let rs = {
        ...station
    };
    rs.id = i;
    rs.opName = "fadd";
    stations[ADD_RS].push(rs);
}
for(let i = 4; i <= 5; i++){
    let rs = {
        ...station
    };
    rs.id = i;
    rs.opName = "fmul";
    stations[MUL_RS].push(rs);
}
for(let i = 6; i <= 9; i++){
    let rs = {
        ...station
    };
    rs.id = i;
    rs.opName = "fld";
    stations[FLD_RS].push(rs);
}
for(let i = 10; i <= 14; i++){
    let rs = {
        ...station
    };
    rs.id = i;
    rs.opName = "fsd";
    stations[FSD_RS].push(rs);
}
const adder = {
    busy: false,
    ready: false,
    station: null,
    result: 0
};
const multiplier = {
    busy: false,
    ready: false,
    station: null,
    result: 0
};
const loadStoreQueue = {
    _data: new Array(9).fill(0),
    _head: 0,
    _tail: 0,
    push (value) {
        this._data[this._tail] = value;
        this._tail = (this._tail + 1) % this._data.length;
    },
    pop () {
        const value = this._data[this._head];
        this._head = (this._head + 1) % this._data.length;
        return value;
    },
    head () {
        return this._data[this._head];
    },
    reset () {
        this._data.fill(0);
        this._head = 0;
        this._tail = 0;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["VSvVG","9UFrG"], "9UFrG", "parcelRequireccd2")

//# sourceMappingURL=index.f4285c13.js.map
