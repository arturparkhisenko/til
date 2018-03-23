// emrun --browser 'chrome' index.html
//
// https://learnopengl.com
// https://open.gl/drawing
// http://docs.gl/gl3/glDrawArrays
// http://www.songho.ca/opengl/gl_vertexarray.html
// https://glm.g-truc.net
// https://solarianprogrammer.com/2013/05/13/opengl-101-drawing-primitives/
// https://github.com/sol-prog/OpenGL-101/tree/master/Getting_Started
// https://www.opengl.org/archives/resources/code/samples/glut_examples/examples/examples.html
// http://shdr.bkcore.com/
// https://shaderfrog.com/app/editor
//
// Popular libraries are GLUT, SDL, SFML and GLFW
// -lglfw3 -lGL -lX11 -lpthread -lXrandr -lXi -ldl
//
// GLAD - for OpenGL drivers
// GLFW - rendering goodies

// https://github.com/assimp/assimp
#include "objloader.hpp"
#include <emscripten.h>
// Be sure to include GLAD before GLFW
// #include <glad/glad.h>
#define GLFW_INCLUDE_ES3
#include <GLES3/gl3.h>
#include <GLFW/glfw3.h>
// #include <GL/glew.h>
// #include <GL/glut.h>
// #include <EGL/egl.h>
#include <cstring>
#include <iostream> // for console
#include <math.h>
#include <stddef.h>
#include <stdio.h> // for files
#include <stdlib.h>
#include <string>
#include <vector>

// #include <glm/glm.hpp>
#include "glm/glm/ext.hpp" // includes matrix_transform
#include "glm/glm/glm.hpp"
// #include <glm/gtc/matrix_transform.hpp>
// #include "glm/glm/gtc/matrix_transform.hpp"

using namespace std;

GLFWwindow *window;
GLuint VAO, VBO, EBO, vertex_shader, fragment_shader, programID, vertexbuffer,
    uvbuffer, normalbuffer, lightVAO;

vector<glm::vec3> vertices;
vector<glm::vec2> uvs;     // mapping textures
vector<glm::vec3> normals; // vertex normal

const int WIDTH = 442;
const int HEIGHT = 442;

// --------------------------------------
void setMat4(const std::string &name, const glm::mat4 &mat) {
  glUniformMatrix4fv(glGetUniformLocation(programID, name.c_str()), 1, GL_FALSE,
                     &mat[0][0]);
}
// --------------------------------------
void setVec3(const std::string &name, const glm::vec3 &value) {
  glUniform3fv(glGetUniformLocation(programID, name.c_str()), 1, &value[0]);
}
void setVec3(const std::string &name, float x, float y, float z) {
  glUniform3f(glGetUniformLocation(programID, name.c_str()), x, y, z);
}
// --------------------------------------
void setVec4(const std::string &name, const glm::vec4 &value) {
  glUniform4fv(glGetUniformLocation(programID, name.c_str()), 1, &value[0]);
}
void setVec4(const std::string &name, float x, float y, float z, float w) {
  glUniform4f(glGetUniformLocation(programID, name.c_str()), x, y, z, w);
}
// --------------------------------------

// https://github.com/JoeyDeVries/LearnOpenGL/blob/master/includes/learnopengl/shader.h
static void generate_frame() {
  // Clear the screen, buffers:
  // GL_COLOR_BUFFER_BIT, GL_DEPTH_BUFFER_BIT, GL_STENCIL_BUFFER_BIT
  glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

  // set bg color to check if it's working
  glClearColor(0.1f, 0.1f, 0.1f, 0.9f);

  // 1rst attribute buffer : vertices
  glEnableVertexAttribArray(0);
  glBindBuffer(GL_ARRAY_BUFFER, vertexbuffer);
  glVertexAttribPointer(0,        // attribute
                        3,        // size
                        GL_FLOAT, // type
                        GL_FALSE, // normalized?
                        0,        // stride
                        (void *)0 // array buffer offset
  );
  // 2nd attribute buffer : UVs
  glEnableVertexAttribArray(1);
  glBindBuffer(GL_ARRAY_BUFFER, uvbuffer);
  glVertexAttribPointer(1,        // attribute
                        2,        // size
                        GL_FLOAT, // type
                        GL_FALSE, // normalized?
                        0,        // stride
                        (void *)0 // array buffer offset
  );
  // 3d attribute buffer : normals
  // 3rd attribute buffer : normals
  glEnableVertexAttribArray(2);
  glBindBuffer(GL_ARRAY_BUFFER, normalbuffer);
  glVertexAttribPointer(2,        // attribute
                        3,        // size
                        GL_FLOAT, // type
                        GL_FALSE, // normalized?
                        0,        // stride
                        (void *)0 // array buffer offset
  );

  // camera/view transformation ---------
  glm::mat4 view;
  // float radius = 10.0f;
  float radius = 0.5f;
  float camX = sin(glfwGetTime()) * radius;
  float camZ = cos(glfwGetTime()) * radius;
  view = glm::lookAt(glm::vec3(camX, 0.0f, camZ), // eye
                     glm::vec3(0.0f, 0.0f, 0.0f), // center
                     glm::vec3(0.0f, 1.0f, 0.0f)  // up
  );
  setMat4("view", view);

  // lights -----------------------------
  setVec3("lightPos", 1.2f, 1.0f, 2.0f);
  setVec3("lightColor", 1.0f, 1.0f, 1.0f); // diffuse
  setVec3("objectColor", 1.0f, 0.5f, 0.31f);

  // position transformation ------------
  // projection aka position transformation
  // glm::mat4 projection;
  // projection = glm::perspective(
  //   glm::radians(45.0f), // fovy, radians 45.0f
  //   (float)WIDTH/(float)HEIGHT, // aspect
  //   0.1f, // near, 0.1f
  //   100.0f // far, 100.0f
  // );
  // projection = glm::rotate(
  //   projection,
  //   glm::radians(-55.0f),
  //   glm::vec3(1.0f, 0.0f, 0.0f)
  // );
  // projection  = glm::translate(projection,
  //   glm::vec3(0.0f, -3.0f, 0.0f) // left, up, right
  // );
  // setMat4("projection", projection);

  // Draw the triangles ------------------
  glDrawArrays(GL_TRIANGLES, 0, vertices.size());
  glDisableVertexAttribArray(0);
  glDisableVertexAttribArray(1);
  glDisableVertexAttribArray(2);

  // check and call events and swap the buffers
  glfwSwapBuffers(window);
  glfwPollEvents();
}

// 2 shaders using GLSL language (C-like)
static const char *vertex_shader_simple =
    "#version 300 es\n"
    "layout (location = 0) in vec3 aPosition;\n"
    "layout (location = 1) in vec2 aTexUv;\n"
    "layout (location = 2) in vec3 aNormal;\n"
    "out vec3 fNormal;\n"
    "out vec2 fTexUv;\n"
    "out vec3 fPosition;\n"
    "uniform mat4 view;\n"
    "void main()\n"
    "{\n"
    "  fNormal = aNormal;\n"
    "  fTexUv = aTexUv;\n"
    "  fPosition = aPosition;\n"
    // gl_Position = vec4(left, top, turn, scale);
    // Default ----------------------------
    // "  gl_Position = vec4(aPosition, 1.0);\n"
    //
    // Guldan: left, top, turn, scale
    // "  gl_Position = vec4(aPosition.x, aPosition.y-1.4, aPosition.z, 1.7);\n"
    // "  gl_Position = view * vec4(aPosition.x, aPosition.y-1.4,
    // aPosition.z, 1.7);\n"
    //
    // Sylvanas ---------------------------
    // "  gl_Position = vec4(aPosition.x, aPosition.y-1.0, aPosition.z, 1.0);\n"
    // "  gl_Position = view * vec4(aPosition.x, aPosition.y-1.0,
    // aPosition.z, 1.0);\n"
    //
    // Venus_von_Milos --------------------
    // "  gl_Position = vec4(aPosition.x, aPosition.y-2.4, aPosition.z, 3.4);\n"
    "  gl_Position = view * vec4(aPosition.x, aPosition.y-2.4, aPosition.z, "
    "3.4);\n"
    //
    "}\n";

// usual:
static const char *fragment_shader_simple =
    "#version 300 es\n"
    "precision highp float;\n"
    "out vec4 FragColor;\n"
    "in vec3 fNormal;\n"
    // "in vec2 fTexUv;\n"
    // "in vec2 fPosition;\n"
    // "uniform sampler2D ourTexture;\n"
    "void main()\n"
    "{\n"
    // "  FragColor = vec4(0.3f, 0.5f, 0.3f, 0.8f);\n" // Model color, RGBA
    "  FragColor = vec4(fNormal, 1.0);\n"
    // "  FragColor = texture(ourTexture, fTexUv);\n"
    "}\n";

// with lights
// static const char *fragment_shader_simple =
//   "#version 300 es\n"
//   "precision highp float;\n"
//   "out vec4 FragColor;\n"
//   "in vec3 fNormal;\n"
//   "in vec2 fTexUv;\n"
//   "in vec3 fPosition;\n"
//   "uniform vec3 lightPos;\n"
//   "uniform vec3 lightColor;\n"
//   "uniform vec3 objectColor;\n"
//   "void main()\n"
//   "{\n"
//   "  vec3 ambient = vec3(0.2f, 0.2f, 0.2f);\n"
//   "  vec3 norm = normalize(fNormal);\n"
//   "  vec3 lightDir = normalize(lightPos - fPosition);\n"
//   "  float diff = max(dot(norm, lightDir), 0.0);\n"
//   "  vec3 diffuse = diff * lightColor;\n"
//   "  vec3 result = (ambient + diffuse) * objectColor;\n"
//   "  FragColor = vec4(result, 1.0);\n"
//   "}\n";

void framebuffer_size_callback(GLFWwindow *window, int width, int height) {
  glViewport(0, 0, width, height);
}

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
#ifdef __APPLE__ // fix for MacOS
  glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
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
  // Resize callback --------------------
  glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);
  // configure global opengl state ------
  glEnable(GL_DEPTH_TEST);
  // ------------------------------------
  // Read our Wavefront .obj file
  bool res = loadOBJ(
      // "./src/models/Guldan.obj",
      // "./src/models/Sylvanas.obj",
      "./src/models/Venus_von_Milo.obj", vertices, uvs, normals); //+
  // cout << &vertices[0] << endl; // test
  // uvs - vt - textrures indexes
  // normals - vn - normals
  //
  // VAO and VBO and EBO
  // Vertex Buffer Objects
  // Vertex Array Object
  // Element Buffer Objects
  //
  // GL_STATIC_DRAW: the data will most likely not change at all or very rarely.
  // GL_DYNAMIC_DRAW: the data is likely to change a lot.
  // GL_STREAM_DRAW: the data will change every time it is drawn.
  // ------------------------------------

  glGenBuffers(1, &vertexbuffer); // VBO
  glBindBuffer(GL_ARRAY_BUFFER, vertexbuffer);
  glBufferData(GL_ARRAY_BUFFER, vertices.size() * sizeof(glm::vec3),
               &vertices[0], GL_STREAM_DRAW);

  glGenBuffers(1, &uvbuffer);
  glBindBuffer(GL_ARRAY_BUFFER, uvbuffer);
  glBufferData(GL_ARRAY_BUFFER, uvs.size() * sizeof(glm::vec2), &uvs[0],
               GL_STREAM_DRAW);

  glGenBuffers(1, &normalbuffer);
  glBindBuffer(GL_ARRAY_BUFFER, normalbuffer);
  glBufferData(GL_ARRAY_BUFFER, normals.size() * sizeof(glm::vec3), &normals[0],
               GL_STREAM_DRAW);

  // Vertex shader
  // ------------------------------------
  vertex_shader = glCreateShader(GL_VERTEX_SHADER);
  glShaderSource(vertex_shader, 1, &vertex_shader_simple, NULL);
  glCompileShader(vertex_shader);

  // Fragment shader
  // ------------------------------------
  fragment_shader = glCreateShader(GL_FRAGMENT_SHADER);
  glShaderSource(fragment_shader, 1, &fragment_shader_simple, NULL);
  glCompileShader(fragment_shader);

  // Normals
  // ------------------------------------
  // GLint normalMapLoc = glGetUniformLocation(programID, "normalMap");
  // glUniform1i(normalMapLoc, 2); // Texture unit 2 is for normal maps.
  // glActiveTexture(GL_TEXTURE0 + 2);
  // glBindTexture(GL_TEXTURE_2D, object1NormalMap);
  // glBindSampler(2, linearFiltering); // Same filtering as before

  // Lights
  // ------------------------------------

  // Shader program
  // ------------------------------------
  programID = glCreateProgram();
  glAttachShader(programID, vertex_shader);
  glAttachShader(programID, fragment_shader);
  glLinkProgram(programID);
  glValidateProgram(programID);
  glUseProgram(programID);

  // Render simple loop -----------------
  emscripten_set_main_loop(generate_frame, 0, 0);

  // ------------------------------------
  // Cleanup example on exit:
  // glDeleteShader(vertex_shader);
  // glDeleteShader(fragment_shader);
  // glDeleteBuffers(1, &vertexbuffer);
  // glDeleteBuffers(1, &uvbuffer);
  // glDeleteProgram(programID);
  // glDeleteTextures(1, &Texture);
  // glDeleteVertexArrays(1, &VAO);
  // ------------------------------------
  // on exit:
  // glfwTerminate();
  // emscripten_force_exit(EXIT_FAILURE);
  return 0;
}
