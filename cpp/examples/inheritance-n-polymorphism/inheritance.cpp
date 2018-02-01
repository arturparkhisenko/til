#include <iostream>
using namespace std;

class Hero {
public:
  Hero(){};
  void crush() { cout << "RAWRRR"; }
};

class Hulk : public Hero {
public:
  Hulk(){};
};

int main() {
  Hulk d;
  d.crush();

  return 0;
}
// Outputs "RAWRRR"
