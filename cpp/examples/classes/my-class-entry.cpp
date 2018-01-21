#include "my-class.h" // MyClass
#include <iostream>
using namespace std;

// to build: g++ my-class-entry.cpp my-class.cpp -o my-class.o

int main() {
  MyClass obj;

  // following pointer points to the obj object
  MyClass *ptr = &obj;

  // arrow member selection operator (->) is used to access an object's members with a pointer
  ptr->myPrint();

  obj.myPrint();

  return 0;
}
