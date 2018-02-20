#include <emscripten.h>

int main() {
  // emscripten_run_script or
  EM_ASM(
    const el = document.getElementById('hello-world');
    el.textContent = 'Hello World!';
  );
  return 0;
}
