(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/fib-sync.js":
/*!*************************!*\
  !*** ./src/fib-sync.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fib_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fib.wasm */ \"./src/fib.wasm\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_fib_wasm__WEBPACK_IMPORTED_MODULE_0__[\"fib\"]);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZmliLXN5bmMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmliLXN5bmMuanM/MTJhNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2ZpYn0gZnJvbSAnLi9maWIud2FzbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZpYjtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/fib-sync.js\n");

/***/ }),

/***/ "./src/fib.wasm":
/*!**********************!*\
  !*** ./src/fib.wasm ***!
  \**********************/
/*! exports provided: fib */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];
__webpack_require__.r(exports);
// export exports from WebAssembly module
for(var name in wasmExports) if(name != "__webpack_init__") exports[name] = wasmExports[name];
// exec imports from WebAssembly module (for esm order)


// exec wasm module
wasmExports["__webpack_init__"]()

/***/ })

}]);