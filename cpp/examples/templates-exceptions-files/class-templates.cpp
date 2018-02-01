// Class Templates

// Like function templates, we can also define class templates,
// allowing classes to have members that use template parameters as types.

#include <iostream>
using namespace std;

// Syntax to define the class template:
template <class T> class MyClass {};

// another example
template <class T> class Two {
private:
  T first, second;

public:
  Two(T a, T b) : first(a), second(b) {}
};

// A specific syntax is required in case you define your member functions
// outside of your class - for example in a separate source file.
// You need to specify the generic type in angle brackets after the class name.
// For example, to have a member function bigger() defined outside of the class,
// the following syntax is used:
template <class T> class Two2 {
private:
  T first, second;

public:
  Two2(T a, T b) : first(a), second(b) {}
  T bigger();
};

template <class T> T Two2<T>::bigger() {
  return (first > second ? first : second);
}

int main() {
  // To create objects of the template class for different types, specify the
  // data type in angle brackets, as we did when defining the function outside
  // of the class.
  // Here, we create a Two2 object for integers.
  Two2<int> obj(3, 6);
  cout << obj.bigger() << endl; // 6

  // We can use the same class to create an object that stores any other type.
  Two2<double> obj2(3, 6.6);
  cout << obj2.bigger() << endl; // 6.6

  return 0;
}
