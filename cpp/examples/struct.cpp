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
  myPoint.x = 11;
  myPoint.y = 33;
  printPoint(myPoint);
  return 0;
}
