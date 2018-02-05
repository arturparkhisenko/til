// gcc fib.c -o fib.o&& ./fib.o
// emcc test.c -s WASM=1 -s SIDE_MODULE=1 -O1 -o test.wasm

int fib(int x) { return x < 2 ? 1 : fib(x - 1) + fib(x - 2); }
