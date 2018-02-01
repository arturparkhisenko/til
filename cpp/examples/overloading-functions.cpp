#include <iostream>
using namespace std;

void printNumber(int x = 0) { cout << "Print int: " << x << endl; }

void printNumber(float x = 0.0) { cout << "Print float: " << x << endl; }

int main() {
  int a = 33;
  float b = 12.345;
  printNumber(a); // Print int: 33
  printNumber(b); // Print float: 12.345
  return 0;
}
