// Function Templates

// Functions and classes help to make programs easier to write, safer, and more
// maintainable.
// However, while functions and classes do have all of those advantages, in
// certain cases they can also be somewhat limited by C++'s requirement that you
// specify types for all of your parameters.

// For example, you might want to write a function that calculates the sum of
// two numbers, similar to this:

#include <iostream>
using namespace std;

// Usual function overloading
int sum1(int a, int b) { return a + b; }
double sum1(double a, double b) { return a + b; }

// To define a function template, use the keyword template, followed by the
// template type definition:
// `template <class T>`
// T is short for Type
// We named our template type T, which is a generic data type.
// you can declare your type parameters using any identifiers that work for you
template <class T> T sum2(T a, T b) { return a + b; }

// multiple generic data types
template <class T, class U> T smaller(T a, U b) { return (a < b ? a : b); }
// The output converts to an integer, because we specified the function
// template's return type to be of the same type as the first parameter (T),
// which is an integer.

int main() {
  cout << "sum1 i " << sum1(3, 6) << endl;
  cout << "sum1 i " << sum1(0.5, 0.3) << endl;

  cout << "sum2 d " << sum2(3, 6) << endl;
  cout << "sum2 d " << sum2(0.5, 0.3) << endl;

  cout << "smaller i d " << smaller(2.5, 6) << endl;

  return 0;
}

// When creating a template type parameter, the keyword typename may be used as
// an alternative to the keyword class: template <typename T>.
// In this context, the keywords are identical, but throughout this course,
// we'll use the keyword class.
