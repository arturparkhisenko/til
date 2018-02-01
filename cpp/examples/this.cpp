#include <iostream>
using namespace std;

class MyClass {
public:
  MyClass(int a) : var(a) {}
  void printInfo() {
    cout << var << endl;
    cout << this->var << endl;
    cout << (*this).var << endl;
  }

private:
  int var;
};

int main() {
  MyClass obj(42);
  obj.printInfo();
  return 0;
}

/* Outputs
42
42
42
*/
