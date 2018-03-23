// emrun --browser 'chrome' index-triangle.html
//
// https://learnopengl.com
// https://open.gl/drawing
// http://docs.gl/gl3/glDrawArrays
// http://www.songho.ca/opengl/gl_vertexarray.html
// https://glm.g-truc.net
// https://solarianprogrammer.com/2013/05/13/opengl-101-drawing-primitives/
// https://github.com/sol-prog/OpenGL-101/tree/master/Getting_Started
//
// Popular libraries are GLUT, SDL, SFML and GLFW
// -lglfw3 -lGL -lX11 -lpthread -lXrandr -lXi -ldl
//
// GLAD - for OpenGL drivers
// GLFW - rendering goodies

#include <emscripten.h>
// Be sure to include GLAD before GLFW
// #include <glad/glad.h>
#define GLFW_INCLUDE_ES3
#include <GLES3/gl3.h>
#include <GLFW/glfw3.h>
#include <cstring>
#include <iostream> // for console
#include <math.h>
#include <stddef.h>
#include <stdio.h> // for files
#include <stdlib.h>
#include <string>
#include <vector>

using namespace std;

GLFWwindow *window;
GLuint vertex_buffer, vertex_shader, fragment_shader, program;
GLint mvp_location, vpos_location, vcol_location;

const int WIDTH = 360;
const int HEIGHT = 360;

static void generate_frame_simple() {
  // set bg color to check if it's working
  glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
  // clear buffers
  // Other: GL_DEPTH_BUFFER_BIT, GL_STENCIL_BUFFER_BIT
  glClear(GL_COLOR_BUFFER_BIT);
  glDrawArrays(GL_TRIANGLES, 0, 3);
  // check and call events and swap the buffers
  glfwSwapBuffers(window);
  glfwPollEvents();
}

void framebuffer_size_callback(GLFWwindow * window, int width, int height) {
  glViewport(0, 0, width, height);
}

// triangle, simple example
// https://learnopengl.com/Getting-started/Hello-Triangle
float vertices[] = {
  -0.5f, -0.5f, 0.0f,
   0.5f, -0.5f, 0.0f,
   0.0f,  0.5f, 0.0f
};
// 2 shaders using GLSL language (C-like)
static const char *vertex_shader_triangle =
  "#version 300 es\n"
  "layout (location = 0) in vec3 aPos;\n"
  "void main()\n"
  "{\n"
  "  gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);\n"
  "}\n";
static const char *fragment_shader_triangle =
  "#version 300 es\n"
  "precision highp float;\n"
  //"precision mediump float;\n"
  "out vec4 FragColor;\n"
  "void main()\n"
  "{\n"
  "  FragColor = vec4(1.0f, 0.5f, 0.2f, 1.0f);\n"
  "}\n";

// ------------------------------------

int main() {
  if (glfwInit() != GL_TRUE) {
    printf("glfwInit() failed\n");
    emscripten_force_exit(EXIT_FAILURE);
  }
  // OpenGL version 3.3
  glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
  glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
  // Core-profile > Immediate mode
  glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
  #ifdef __APPLE__
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE); // uncomment this statement to fix compilation on OS X
  #endif
  // ------------------------------------
  // window, content, viewport
  window = glfwCreateWindow(WIDTH, HEIGHT, "M.CPP", NULL, NULL);
  if (!window) {
    printf("Failed to create GLFW window", stderr);
    glfwTerminate();
    emscripten_force_exit(EXIT_FAILURE);
  }
  glfwMakeContextCurrent(window);
  glViewport(0, 0, WIDTH, HEIGHT);
  // ------------------------------------
  // output used version, example:
  // OpenGL ES 3.0 (WebGL 2.0 (OpenGL ES 3.0 Chromium))
  cout << glGetString(GL_VERSION) << endl;
  // ------------------------------------
  glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);
  // ------------------------------------

  // ------------------------------------
  // Simple example for a triangle

  // Vertex shader ----------------------
  unsigned int vertexShader;
  vertexShader = glCreateShader(GL_VERTEX_SHADER);
  // attach the shader source code to the shader object and compile the shader:
  glShaderSource(vertexShader, 1, &vertex_shader_triangle, NULL);
  glCompileShader(vertexShader);
  // Check compilation ------------------
  int  success;
  char infoLog[512];
  glGetShaderiv(vertexShader, GL_COMPILE_STATUS, &success);
  if (!success) {
    glGetShaderInfoLog(vertexShader, 512, NULL, infoLog);
    cout << "ERROR::SHADER::VERTEX::COMPILATION_FAILED\n" << infoLog << endl;
  } else {
    cout << "SHADER::VERTEX::COMPILATION_SUCCESS\n" << endl;
  }
  // Fragment shader --------------------
  unsigned int fragmentShader;
  fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
  glShaderSource(fragmentShader, 1, &fragment_shader_triangle, NULL);
  glCompileShader(fragmentShader);
  glGetShaderiv(fragmentShader, GL_COMPILE_STATUS, &success);
  if (!success) {
    glGetShaderInfoLog(fragmentShader, 512, NULL, infoLog);
    cout << "ERROR::SHADER::FRAGMENT::COMPILATION_FAILED\n" << infoLog << endl;
  } else {
    cout << "SHADER::FRAGMENT::COMPILATION_SUCCESS\n" << endl;
  }
  // Shader program ---------------------
  unsigned int shaderProgram;
  shaderProgram = glCreateProgram();
  glAttachShader(shaderProgram, vertexShader);
  glAttachShader(shaderProgram, fragmentShader);
  glLinkProgram(shaderProgram);
  // Check shader program ---------------
  glGetProgramiv(shaderProgram, GL_LINK_STATUS, &success);
  if (!success) {
    glGetProgramInfoLog(shaderProgram, 512, NULL, infoLog);
    cout << "ERROR::SHADER::PROGRAM::COMPILATION_FAILED\n" << infoLog << endl;
  } else {
    cout << "SHADER::PROGRAM::COMPILATION_SUCCESS\n" << endl;
  }
  // VAO and VBO ------------------------
  unsigned int VAO; // vertex array object
  glGenVertexArrays(1, &VAO);
  glBindVertexArray(VAO);
  unsigned int VBO; // vertex buffer object
  glGenBuffers(1, &VBO);
  glBindBuffer(GL_ARRAY_BUFFER, VBO);
  glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);
  // Linking Vertex Attributes ----------
  glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
  glEnableVertexAttribArray(0);
  // Use program ------------------------
  glUseProgram(shaderProgram);
  // draw -------------------------------
  glBindVertexArray(VAO);
  glDrawArrays(GL_TRIANGLES, 0, 3);
  // Cleanup ----------------------------
  glDeleteShader(vertexShader);
  glDeleteShader(fragmentShader);
  // Render simple loop -----------------
  emscripten_set_main_loop(generate_frame_simple, 0, 0);
  // non emscripten approach:
  // while(!glfwWindowShouldClose(window)) {
  //   glfwSwapBuffers(window);
  //   glfwPollEvents();
  // }

  // not needed now
  // glfwTerminate();
  // emscripten_force_exit(EXIT_FAILURE);
  return 0;
}
