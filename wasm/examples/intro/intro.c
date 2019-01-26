#include "emscripten.h"
// #include "../emscripten/emscripten.h"
// #include "webassembly.h"
#include <stdio.h>

// docs https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html
// MIME type -> 'application/wasm'
// emcc intro.c -s WASM=1 -o intro.html --shell-file ./shell_minimal_l.html -s
// NO_EXIT_RUNTIME=1 -s RESERVED_FUNCTION_POINTERS=1
// run: npm run build && npm run start
// open: http://localhost:8080/intro.html

int main() {
  printf("Hello World from C\n");
  return 0;
}

// call WASM from JS, -s NO_EXIT_RUNTIME=1
EMSCRIPTEN_KEEPALIVE
void TestFunction(int iVal) {
  printf("TestFunction called! Value passed in was: %i\n", iVal);
}
// call WASM from JS, END

// call JS from C,
/* The simplest way is through macros like emscripten_run_script() or EM_ASM()
 * which basically trigger a JavaScript eval statement. */
/*Note: You need to use single quotes in the macros. Double quotes will cause a
 * syntax error that is not detected by the compiler.*/
void EMSCRIPTEN_KEEPALIVE TestFunctionWithMacro(int iVal) {
  printf("TestFunctionWithMacro called! value passed in was: %i\n", iVal);

  // EM_ASM(alert('Test call from C to JS'); throw 'all done';);
  EM_ASM(alert('Test call from C to JS'););
}
// call JS from C, END

// call JS from C, using pointers
// -s RESERVED_FUNCTION_POINTERS=1
void EMSCRIPTEN_KEEPALIVE CallFunctionPointer(void (*f)(void)) { (*f)(); }
// call JS from C, using pointers END
