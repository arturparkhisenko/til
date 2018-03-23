all:
	em++ \
		-std=c++11 \
		-g4 \
		-s FORCE_FILESYSTEM=1 \
		-s USE_WEBGL2=1 \
		-s USE_GLFW=3 \
		-s FULL_ES2=1 \
		-s FULL_ES3=1 \
		-s ALLOW_MEMORY_GROWTH=1 \
		--embed-file ./src/models/ \
		-o ./index.html \
		./src/m.cpp \
		./src/objloader.cpp

triangle:
	em++ \
		-std=c++11 \
		-g4 \
		-s USE_WEBGL2=1 \
		-s USE_GLFW=3 \
		-s FULL_ES2=1 \
		-s FULL_ES3=1 \
		-o ./index-triangle.html \
		./src/main-triangle.cpp
