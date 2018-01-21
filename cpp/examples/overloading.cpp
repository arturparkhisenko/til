#include <iostream>
using namespace std;

void printNumber(int x = 1) {
  cout << "Prints an integer: " << x << endl;
}

void printNumber(float x = 0.0) {
  cout << "Prints a float: " << x << endl;
}

int main() {
  int a = 16;
  float b = 54.541;
  printNumber(a);
  printNumber(b);
}

/* Output:
Prints an integer: 16
Prints a float: 54.541
*/
