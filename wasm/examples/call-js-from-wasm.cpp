#include <emscripten.h>

int main() {
  EM_ASM(
    const el = document.getElementById('hello-world');
    el.textContent = 'Hello World!';
  );
  return 0;
}
