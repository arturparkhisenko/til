# target: dependencies
# [tab] system command

# -s "BINARYEN_METHOD='native-wasm'" \

all:
	emcc \
		-std=c99 \
		-Oz \
		-s WASM=1 \
		-s MODULARIZE=1 \
		-s SIDE_MODULE=1 \
		-s BINARYEN_ASYNC_COMPILATION=0 \
		-o fib-module.wasm \
		fib-module.c
