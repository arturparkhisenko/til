#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int fib(int x) { return x < 2 ? 1 : fib(x - 1) + fib(x - 2); }
