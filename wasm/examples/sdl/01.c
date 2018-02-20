// emcc 01.c -g4 -o 01.html
// emrun --browser 'chrome' 01.html

#include <SDL/SDL.h>
#include <stdio.h>

int main(int argc, char **argv) {
  SDL_Init(SDL_INIT_VIDEO);
  SDL_Surface *s = SDL_SetVideoMode(200, 200, 32, SDL_HWSURFACE);
  SDL_Rect rect = {50, 50, 100, 100};
  SDL_FillRect(s, &rect, 0xffff0000);
  printf("Done!\n");
  return 0;
}
