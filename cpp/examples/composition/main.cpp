#include "birthday.h"
#include "person.h"
#include <string>

// to build: g++ main.cpp person.cpp birthday.cpp -o main.o

int main() {
  Birthday bd(1, 22, 1333);
  Person p("Apathy", bd);
  p.printInfo();
}

/* Outputs
David
2/21/1985
*/
