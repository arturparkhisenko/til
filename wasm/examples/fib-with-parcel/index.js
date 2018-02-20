// wasm should be generated from the cleaned wast

// synchronous import
import {fib} from './fib.wasm';
console.log(fib(5));
