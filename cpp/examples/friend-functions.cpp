// friend functions

// Declaring a non-member function as a friend of a class allows it to access
// the class private members.
// Precede a declaration with the keyword friend.

#include <iostream>
using namespace std;

class MyClass {
public:
  MyClass() { secret = 42; }

private:
  int secret;

  friend void good(MyClass &obj);
};

void good(MyClass &obj) {
  // obj.secret = 99;
  cout << obj.secret;
}

int main() {
  MyClass obj;
  good(obj);
  return 0;
}
