// https://github.com/alexcrichton/wasm-bindgen/issues/39#issuecomment-370072160
// https://github.com/webpack/webpack/tree/master/test/cases/wasm/simple

// webpack 4.1.1 - Sync WebAssembly compilation is not yet implemented
// import {fib} from './fib.wasm';
// console.log('import test fib', fib);

// WebAssembly module (indirect)
import("./fib-sync").then(module => {
	const result = module.default(13);
  console.log('fib-sync', result);
});

// WebAssembly module (direct)
import("./fib.wasm").then(wasm => {
	const result = wasm.fib(13);
  console.log('fib.wasm', result);
});
