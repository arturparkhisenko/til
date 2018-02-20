// gcc fib-module.c -o fib-module.o&& ./fib-module.o
// emcc fib-module.c -s WASM=1 -s SIDE_MODULE=1 -Oz -o fib-module.wasm

int fib(int x) { return x < 2 ? 1 : fib(x - 1) + fib(x - 2); }
