// Operators that can't be overloaded include:
// .* | :: | . | ?:

#include <iostream>
using namespace std;

// sum of the two objects
class MyClass {
public:
  int var;
  MyClass() {}
  MyClass(int a) : var(a) {}

  MyClass operator+(MyClass &obj) {
    MyClass res;
    res.var = this->var + obj.var;
    return res;
  }
};

int main() {
  MyClass obj1(11), obj2(22);
  MyClass res = obj1 + obj2;
  cout << res.var;
  return 0;
}

// Outputs 33
