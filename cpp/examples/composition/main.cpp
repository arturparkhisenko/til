#include "birthday.h"
#include "person.h"
#include <string>

// to build: g++ main.cpp person.cpp birthday.cpp -o main.o

int main() {
  Birthday bd(1333, 12, 1);
  Person p("Apathy", bd);
  p.printInfo();

  return 0;
}

/* Outputs
Apathy
2/21/1985
*/
