// Даны действительные положительные числа a, b, c, x, y.
// Выяснить, пройдет ли кирпич с ребрами a, b, c
// в прямоугольное отверстие со сторонами x и y.
// Просовывать кирпич в отверстие разрешается только так,
// чтобы каждое из его ребер было параллельно или
// перпендикулярно каждой из сторон отверстия.

#include <iostream>

using namespace std;

int main()
{
  int a = 7;
  int b = 3;
  int c = 4;

  int x = 5;
  int y = 6;

  bool result = false;

  cout << "a: " << a << " b: " << b << " c: " << c << endl;
  cout << "x: " << x << " y: " << y << endl;

  bool testAB = (x - a) >= 0 && (y - b) >= 0;
  bool testBC = (x - b) >= 0 && (y - c) >= 0;
  bool testAC = (x - a) >= 0 && (y - c) >= 0;

  cout << "- Test AB: " << testAB << endl;
  cout << "- Test BC: " << testBC << endl;
  cout << "- Test AC: " << testAC << endl;

  result = testAB || testBC || testAC;

  const char *resultString = result ? "true" : "false";

  cout << "Result: " << resultString << endl;

  return 0;
}
