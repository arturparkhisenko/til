// https://github.com/opengl-tutorials/ogl

#ifndef OBJLOADER_H
#define OBJLOADER_H

#include "glm/glm/glm.hpp"

#define GLFW_INCLUDE_ES3
#include <GLES3/gl3.h>
#include <GLFW/glfw3.h>
#include <vector>

bool loadOBJ(
  const char *path,
  std::vector<glm::vec3> &out_vertices,
  std::vector<glm::vec2> &out_uvs,
  std::vector<glm::vec3> &out_normals
);

bool loadAssImp(
  const char *path,
  std::vector<unsigned short> &indices,
  std::vector<glm::vec3> &vertices,
  std::vector<glm::vec2> &uvs,
  std::vector<glm::vec3> &normals
);

#endif
