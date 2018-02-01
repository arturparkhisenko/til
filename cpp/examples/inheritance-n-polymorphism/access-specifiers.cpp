// Access specifiers

// public
// private
// protected - similar to a private, but it can be accessed in the derived
// classes

// If no access specifier is used when inheriting classes,
// the type will be private by default.

// parent constructor called first,
// then children constructor, destructor and
// then parent destructor

#include <iostream>
using namespace std;

class Hero {
public:
  void log() { cout << var; }

private:
  int var = 0;

protected:
  int someVar;
};
