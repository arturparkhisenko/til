# [webassembly](https://webassembly.org/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Requirements](#requirements)
- [Commands](#commands)
- [Some docs](#some-docs)
  - [Options emscripten](#options-emscripten)
- [Tools](#tools)
- [Url's](#urls)
  - [Articles](#articles)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Requirements

- [CMake](https://cmake.org/), `brew install cmake`
- [Python](https://www.python.org/) 2.7+
- One of: [GCC for Linux](https://gcc.gnu.org/), [Xcode for MacOS](https://developer.apple.com/xcode/), [VisualStudio 2015+ for Windows](https://visualstudio.microsoft.com/)
- [Toolchain](https://webassembly.org/getting-started/developers-guide/)
- I also use `wabt` from the tools section.

## Commands

- To compile C/C++
  - `emcc hw.c -s WASM=1 -s SIDE_MODULE=1 -o hw.wasm`
  - `emcc hw.cpp -s WASM=1 -o hw.html`
  - `em++ hw.cpp -s WASM=1 --bind --std=c++11 -o hw.js`

- To update emsdk source run `emsdk update` or `git pull&&emsdk update-tags` (for the github repo clone)
- To update emsdk used run `emsdk install sdk-1.38.24-64bit` change version to the latest (see `emsdk list`), this action will install 3 components: emscripten-1.38.24, clang-e1.38.24-64bit, node-8.9.1-64bit
- To activate emsdk run `emsdk activate sdk-1.38.24-64bit`

## Some docs

- [Deploying-Pages](https://emscripten.org/docs/compiling/Deploying-Pages.html)
- [Interacting-with-code](https://emscripten.org/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html)

### Options [emscripten](https://emscripten.org/docs/tools_reference/emcc.html)

> all options here [settings](https://github.com/emscripten-core/emscripten/blob/master/src/settings.js)

- `-Os` optimizations (O0, O1, O2, O3, Os, Oz)
- `-g` generate wast, wasm, wasm.map
- `-s WASM=1` with JS polyfill
- `-s "BINARYEN_METHOD='native-wasm'"` without polyfill (default)
  - methods: `['native-wasm', 'interpret-s-expr', 'interpret-binary', 'interpret-asm2wasm', 'asmjs']`
- `-o <target>` one of `<name> + '.js' || '.html' || '.bc'(default) || '.o'`
- `-s MAIN_MODULE=1` system libraries linked in or `-s SIDE_MODULE=1` without
- `-s BINARYEN_ASYNC_COMPILATION=1`
- `-s ONLY_MY_CODE=1` only compiles your methods, and stops Emscripten including parts of its standard library
- `-s EXPORTED_FUNCTIONS="['_my_func','_my_2d_func']"` lists the methods we'd like to access from JavaScript. Note that these names are from the source, with a prefixed underscore.

## Tools

- [binaryen](https://github.com/WebAssembly/binaryen) asm2wasm, s2wasm, wasm2asm, mir2wasm
- [wabt](https://github.com/WebAssembly/wabt) wat2wasm, wasm2wat, wasm-objdump, wasm-interp, wat-desugar, wasm-link
- [emscripten](https://emscripten.org/)
- [WasmExplorer](https://mbebenita.github.io/WasmExplorer/)
- [webassembly.studio](https://webassembly.studio/)
- [WasmCodeExplorer](https://wasdk.github.io/wasmcodeexplorer/)
- [WasmFiddle](https://wasdk.github.io/WasmFiddle/)
- [AssemblyScript](https://github.com/AssemblyScript/assemblyscript)
- [wasm-pack](https://github.com/rustwasm/wasm-pack)

## Url's

- [awesome-wasm](https://github.com/mbasso/awesome-wasm)
- [cppwasm-book](https://3dgen.cn/cppwasm-book/en/), [source](https://github.com/3dgen/cppwasm-book)
- [wasm-reference-manual](https://github.com/sunfishcode/wasm-reference-manual)

### Articles

- [MDN WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [rust-to-webassembly](https://hackernoon.com/compiling-rust-to-webassembly-guide-411066a69fde)
- [cartoon-introduction](https://www.smashingmagazine.com/2017/05/abridged-cartoon-introduction-webassembly/)
- [first-steps](https://blog.openbloc.fr/webassembly-first-steps/)
- [Real World WebAssembly (Chrome Dev Summit 2017)](https://youtu.be/PpuAqLCraAQ)
- [asmjs-diet](https://floooh.github.io/2016/08/27/asmjs-diet.html)
- [wasm how to start, ru](https://medium.com/@reklatsmasters/webassembly-for-beginners-d3ce859cb007)
- [zandaqo/iswasmfast](https://github.com/zandaqo/iswasmfast)
- [rust and webassembly in 2019](http://fitzgeraldnick.com/2018/12/14/rust-and-webassembly-in-2019.html)
- [emscripten-npm](https://developers.google.com/web/updates/2019/01/emscripten-npm)
- [dev google hotpath-with-wasms](https://developers.google.com/web/updates/2019/02/hotpath-with-wasms)
- [the-design-of-webassembly](https://medium.freecodecamp.org/the-design-of-webassembly-81f1dcabaddd)
- Wasm troubles series:
  - [1. wasm-is-not-a-stack-machine](http://troubles.md/posts/wasm-is-not-a-stack-machine/)
  - [2. why-do-we-need-the-relooper-algorithm-again](http://troubles.md/posts/why-do-we-need-the-relooper-algorithm-again/)
  - [3. the-stack-is-not-the-stack](http://troubles.md/posts/the-stack-is-not-the-stack/)
  - [4. microwasm](http://troubles.md/posts/microwasm/)
