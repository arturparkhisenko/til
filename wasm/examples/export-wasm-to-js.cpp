#include <emscripten/bind.h>

emscripten::val my_function(int w, int h) {
  return emscripten::val(emscripten::typed_memory_view(bufferSize, buffer));
}

EMSCRIPTEN_BINDINGS(hello) {
  emscripten::function("my_function", &my_function);
}
