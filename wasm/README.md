# [webassembly](http://webassembly.org/)

## Requirements

- [CMake](https://cmake.org/)
- [Python](https://www.python.org/) 2.7+
- Linux-[GCC](https://gcc.gnu.org/), MACOS-[Xcode](https://developer.apple.com/xcode/), Windows-[VisualStudio](https://www.visualstudio.com/) 2015+

## Commands

- To compile: 
  - `emcc hello_world.c -Os -s WASM=1 -s SIDE_MODULE=1 -o hello_world.wasm`
  - `emcc hello.c -s WASM=1 -o hello.html`

## Tools

- [binaryen](https://github.com/WebAssembly/binaryen)
- [wabt](https://github.com/WebAssembly/wabt)
- [WasmExplorer](https://mbebenita.github.io/WasmExplorer/)

## Url's

- [wasmrocks](https://www.wasmrocks.com/)
- [awesome-wasm](https://github.com/mbasso/awesome-wasm)

### Articles

- [how-to-learn-webassembly](https://medium.com/pandera-labs/learning-how-to-learn-webassembly-7743663ed4d0)
- [rust-to-webassembly](https://hackernoon.com/compiling-rust-to-webassembly-guide-411066a69fde)
- [cartoon-introduction](https://www.smashingmagazine.com/2017/05/abridged-cartoon-introduction-webassembly/)
- [first-steps](https://blog.openbloc.fr/webassembly-first-steps/)
