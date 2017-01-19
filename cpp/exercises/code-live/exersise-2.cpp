#include <iostream>

using namespace std;

int main()
{
  // setlocale(0, ""); // use user-prefered locale?
  int a;
  int b;

  cout << "First argument: ";
  cin >> a; // input
  cout << "Second argument: ";
  cin >> b;

  int c = a + b; // operation

  cout << "Summ of args: " << c << endl;

  return 0;
}
