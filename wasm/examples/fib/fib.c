#include <stdio.h>

// gcc fib.c -o fib.o&& ./fib.o

int fib(int x) { return x < 2 ? 1 : fib(x - 1) + fib(x - 2); }

int main() {
  int result = fib(28);

  printf("%d\n", result);
  return 0;
}
