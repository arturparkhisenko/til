// Даны действительные числа x, y (x ≠ y).
// Меньшее из этих двух чисел заменить их полусуммой,
// а большее – их удвоенным произведением.

#include <iostream>

using namespace std;

int main()
{
  int a = 2;
  int b = 4;

  cout << "a: " << a << " b: " << b << endl;

  int t = a;
  a = (t + b) / 2;
  b = (t * b) * 2;

  cout << "a: " << a << " b: " << b << endl;

  return 0;
}
