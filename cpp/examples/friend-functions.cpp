// friend functions
// Normally, private members of a class cannot be accessed from outside of that
// class.
// However, declaring a non-member function as a friend of a class allows it to
// access the class' private members. This is accomplished by including a
// declaration of this external function within the class, and preceding it with
// the keyword friend.
// In the example below, someFunc(), which is not a member function of the
// class, is a friend of MyClass and can access its private members.

#include <iostream>
using namespace std;

class MyClass {
public:
  MyClass() { regVar = 0; }

private:
  int regVar;

  friend void someFunc(MyClass &obj);
};

void someFunc(MyClass &obj) {
  obj.regVar = 42;
  cout << obj.regVar;
}
