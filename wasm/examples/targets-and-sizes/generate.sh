#!/bin/bash
# chmod +x ./generate.sh

rm -rf {bc,wasm,js,html}
mkdir {bc,wasm,js,html}

#.asm.js for cli: emcc hw.c

echo "Compiling .bc/.o ..."
#.bc||.o - c
emcc hw.c -o bc/hw-c.bc
emcc hw.c -Os -o bc/hw-c-Os.bc
emcc hw.c -s WASM=1 -o bc/hw-c-w1.bc
#.bc||.o - cpp
emcc hw.cpp -o bc/hw-cpp.bc
emcc hw.cpp -Os -o bc/hw-cpp-Os.bc
emcc hw.cpp -s WASM=1 -o bc/hw-cpp-w1.bc
#.bc||.o - cpp only
emcc hw.cpp --bind --std=c++11 -o bc/hw-cpp-cpp11.bc

echo "Compiling .wasm ..."
#.wasm - c
emcc hw.c -s WASM=1 -s SIDE_MODULE=1 -o wasm/hw-c-w1-sm1.wasm
emcc hw.c -Os -s WASM=1 -s SIDE_MODULE=1 -o wasm/hw-c-Os-w1-sm1.wasm
#.wasm - cpp
emcc hw.cpp -s WASM=1 -s SIDE_MODULE=1 -o wasm/hw-cpp-w1-sm1.wasm
emcc hw.cpp -Os -s WASM=1 -s SIDE_MODULE=1 -o wasm/hw-cpp-Os-w1-sm1.wasm
#.wasm - cpp only
emcc hw.cpp -s WASM=1 -s SIDE_MODULE=1 --bind --std=c++11 -o wasm/hw-cpp-w1-sm1-cpp11.wasm

echo "Compiling .js ..."
#.js - c
emcc hw.c -o js/hw-c.js
emcc hw.c -Os -o js/hw-c-Os.js
emcc hw.c -s WASM=1 -o js/hw-c-w1.js
#.js - cpp
emcc hw.cpp -o js/hw-cpp.js
emcc hw.cpp -Os -o js/hw-cpp-Os.js
emcc hw.cpp -s WASM=1 -o js/hw-cpp-w1.js
#.js - cpp only
emcc hw.cpp --bind --std=c++11 -o js/hw-cpp-cpp11.js

echo "Compiling .html ..."
#.html - c
emcc hw.c -o html/hw-c.html
emcc hw.c -Os -o html/hw-c-Os.html
emcc hw.c -s WASM=1 -o html/hw-c-w1.html
emcc hw.c -s WASM=1 -s SIDE_MODULE=1 -o html/hw-c-w1-sm1.html
#.html - cpp
emcc hw.cpp -o html/hw-cpp.html
emcc hw.cpp -Os -o html/hw-cpp-Os.html
emcc hw.cpp -s WASM=1 -o html/hw-cpp-w1.html
emcc hw.cpp -s WASM=1 -s SIDE_MODULE=1 -o html/hw-cpp-w1-sm1.html
#.html - cpp only
emcc hw.cpp --bind --std=c++11 -o html/hw-cpp-cpp11.html

echo "Done!"
