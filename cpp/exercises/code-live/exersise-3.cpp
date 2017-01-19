#include <iostream>

using namespace std;

int main()
{
  // setlocale(0, ""); // use user-prefered locale?
  int a;
  int b;
  int result;

  cout << "Math division: ";
  cout << "First argument: ";
  cin >> a; // input
  cout << "Second argument: ";
  cin >> b;

  if (a == 0 || b == 0) {
    cout << "Sorry but u can't use 0 in args." << endl;
  } else if (a < b) {
    cout << "Sorry but first argument < second argument." << endl;
  } else {
    result = a / b; // operation
  }

  cout << "Result: " << result << endl;
  return 0;
}
