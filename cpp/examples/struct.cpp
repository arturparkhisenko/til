#include <iostream>

using namespace std;

struct Point {
public:
  int x;
  int y;
};

void printPoint(Point p) { cout << p.x << endl; }

int main() {
  Point myPoint;
  myPoint.x = 10;
  myPoint.y = 30;
  printPoint(myPoint);
  return 0;
}
