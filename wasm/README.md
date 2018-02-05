# [webassembly](http://webassembly.org/)

## Requirements

- [CMake](https://cmake.org/)
- [Python](https://www.python.org/) 2.7+
- Linux-[GCC](https://gcc.gnu.org/), MACOS-[Xcode](https://developer.apple.com/xcode/), Windows-[VisualStudio](https://www.visualstudio.com/) 2015+
- [install toolchain](http://webassembly.org/getting-started/developers-guide/#downloading-or-compiling-the-toolchain)

## Commands

- To compile C/C++: 
  - `emcc hw.c -s WASM=1 -s SIDE_MODULE=1 -o hw.wasm`
  - `emcc hw.cpp -s WASM=1 -o hw.html`
  - `em++ hw.cpp -s WASM=1 --bind --std=c++11 -o hw.js`

- To update emsdk source run `emsdk update` or `git pull&&emsdk update-tags` (for the github repo clone)
- To update emsdk used run `emsdk install sdk-1.37.33-64bit` change version to the latest (see `emsdk list`), this action will install 3 components: emscripten-1.37.33, clang-e1.37.33-64bit, node-8.9.1-64bit
- To activate emsdk run `emsdk activate sdk-1.37.33-64bit`

## Some docs

- [config .emscripten](https://kripken.github.io/emscripten-site/docs/building_from_source/building_emscripten_from_source_on_mac_os_x.html#configuring-emscripten-settings)
- [Deploying-Pages](https://kripken.github.io/emscripten-site/docs/compiling/Deploying-Pages.html?highlight=wasm)
- [Interacting-with-code](https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html)

### Options [emscripten](https://kripken.github.io/emscripten-site/docs/tools_reference/emcc.html)
> all options here [settings](https://github.com/kripken/emscripten/blob/master/src/settings.js)

- `-Os` optimizations (O0, O1, O2, O3, Os, Oz)
- `-g` generate wast, wasm, wasm.map
- `-s WASM=1` with JS polyfill
- `-s "BINARYEN_METHOD='native-wasm'"` without polyfill
  - methods: `['native-wasm', 'interpret-s-expr', 'interpret-binary', 'interpret-asm2wasm', 'asmjs']`
- `-o <target>` one of `<name> + '.js' || '.html' || '.bc'(default) || '.o'`
- `-s MAIN_MODULE=1` system libraries linked in or `-s SIDE_MODULE=1` without
- `-s BINARYEN_ASYNC_COMPILATION=1`
- `-s ONLY_MY_CODE=1` only compiles your methods, and stops Emscripten including parts of its standard library
- `-s EXPORTED_FUNCTIONS="['_my_func','_my_2d_func']"` lists the methods we'd like to access from JavaScript. Note that these names are from the source, with a prefixed underscore.

## Tools

- [binaryen](https://github.com/WebAssembly/binaryen) asm2wasm, s2wasm, wasm2asm, mir2wasm
- [wabt](https://github.com/WebAssembly/wabt) wat2wasm, wasm2wat, wasm-objdump, wasm-interp, wat-desugar, wasm-link
- [emscripten](https://kripken.github.io/emscripten-site/) 
- [WasmExplorer](https://mbebenita.github.io/WasmExplorer/)
- [WasmCodeExplorer](https://wasdk.github.io/wasmcodeexplorer/)
- [WasmFiddle](https://wasdk.github.io/WasmFiddle/)
- [AssemblyScript](https://github.com/AssemblyScript/assemblyscript)

## Url's

- [wasmrocks](https://www.wasmrocks.com/)
- [awesome-wasm](https://github.com/mbasso/awesome-wasm)

### Articles

- [MDN WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [how-to-learn-webassembly](https://medium.com/pandera-labs/learning-how-to-learn-webassembly-7743663ed4d0)
- [rust-to-webassembly](https://hackernoon.com/compiling-rust-to-webassembly-guide-411066a69fde)
- [cartoon-introduction](https://www.smashingmagazine.com/2017/05/abridged-cartoon-introduction-webassembly/)
- [first-steps](https://blog.openbloc.fr/webassembly-first-steps/)
- [Real World WebAssembly (Chrome Dev Summit 2017)](https://youtu.be/PpuAqLCraAQ)
- [asmjs-diet](https://floooh.github.io/2016/08/27/asmjs-diet.html)
- [simplest-way-to-get-started-with-webassembly](https://medium.com/@BenedekGagyi/the-simplest-way-to-get-started-with-webassembly-1f92f6f90d24)
- [wasm how to start](https://medium.com/@reklatsmasters/webassembly-for-beginners-d3ce859cb007)
- [N-API and WebAssembly](https://medium.com/netscape/javascript-c-modern-ways-to-use-c-in-javascript-projects-a19003c5a9ff)
- [zandaqo/iswasmfast](https://github.com/zandaqo/iswasmfast)
- [webassembly-a-new-hope](https://pspdfkit.com/blog/2017/webassembly-a-new-hope/)
