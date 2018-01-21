// Only non-const objects can call non-const functions.
// A constant object can't call regular functions.
// Hence, for a constant object to work you need a constant function.

#include <iostream>
#include "MyConstClass.h"
using namespace std;

int main() {
  const MyClass obj;
  obj.myPrint();
}
