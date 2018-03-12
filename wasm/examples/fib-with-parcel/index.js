// wasm should be generated from the cleaned wast
// To get started you need Cargo's bin directory ($HOME/.cargo/bin) in your PATH
// environment variable.
// To configure your current shell run source $HOME/.cargo/env

// sync import

import {fib} from './fib.wasm';
import {fib as fibRs} from './fib.rs';
console.log(fib(9));
console.log(fibRs(9));

// dynamic
//
// index.js:
// module.exports = import('./dynamic').then(function (add) {
//   return add(2, 3);
// });
// dynamic.js
// var {add} = require('./add.wasm');
// module.exports = add;

// async
//
// WebAssembly module (indirect)
// import('./fib-sync').then(module => {
// 	 const result = module.default(13);
//   console.log('fib-async .js', result);
// });

// WebAssembly module (direct)
// import('./fib.wasm').then(({fib}) => { // wasm.fib
//   const result = fib(13);
//   console.log('fib-async .wasm', result);
// });

// import('./fib.rs').then(({fib}) => {
// 	const result = fib(13);
//   console.log('fib-async .rs', result);
// });
