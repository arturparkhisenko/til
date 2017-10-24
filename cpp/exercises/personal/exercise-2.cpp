// 2 numbers: x, y (x ≠ y).
// if smallest - return a square of it,
// if biggest - return a multiplication with any const

#include <iostream>

using namespace std;

int main()
{
  int a = 2;
  int b = 4;
  const int multiplier = 3;

  cout << "a: " << a << " b: " << b << " multiplier: " << multiplier << endl;

  if (a < b) {
    a *= a;
    b *= multiplier;
  } else {
    b *= b;
    a *= multiplier;
  }

  cout << "a: " << a << " b: " << b << endl;

  return 0;
}
