// Only non-const objects can call non-const functions.
// A constant object can't call regular functions.
// For a constant object to work you need a constant function.

#include "my-const-class.h"
#include <iostream>
using namespace std;

int main() {
  const MyConstClass obj;
  obj.myPrint();
  return 0;
}
