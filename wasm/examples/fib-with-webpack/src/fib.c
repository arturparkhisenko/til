int fib(int x) { return x < 2 ? 1 : fib(x - 1) + fib(x - 2); }

// #include <emscripten.h>
//
// EMSCRIPTEN_KEEPALIVE
// int fib(int n) {
//   int i, t, a = 0, b = 1;
//   for (i = 0; i < n; i++) {
//     t = a + b;
//     a = b;
//     b = t;
//   }
//   return b;
// }
