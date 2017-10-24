// 5 positive numbers: a, b, c, x, y
// Find, if a box with sides a, b, c
// could go through a hole with sides x and y
// Box side must be parallel or perpendicular
// to each hole side

#include <iostream>

using namespace std;

int main()
{
  int a = 7;
  int b = 6;
  int c = 5;

  int x = 5;
  int y = 6;

  bool result = false;

  cout << "a: " << a << " b: " << b << " c: " << c << endl;
  cout << "x: " << x << " y: " << y << endl;

  bool testXYAB = x >= a && y >= b;
  bool testXYBC = x >= b && y >= c;
  bool testXYAC = x >= a && y >= c;

  bool testYXAB = y >= a && x >= b;
  bool testYXBC = y >= b && x >= c;
  bool testYXAC = y >= a && x >= c;

  cout << "- testXYAB: " << testXYAB << endl;
  cout << "- testXYBC: " << testXYBC << endl;
  cout << "- testXYAC: " << testXYAC << endl;

  cout << "- testYXAB: " << testYXAB << endl;
  cout << "- testYXBC: " << testYXBC << endl;
  cout << "- testYXAC: " << testYXAC << endl;

  result = testXYAB || testXYBC || testXYAC ||
    testYXAB || testYXBC || testYXAC;

  const char *resultString = result ? "true" : "false";

  cout << "Result: " << resultString << endl;

  return 0;
}
