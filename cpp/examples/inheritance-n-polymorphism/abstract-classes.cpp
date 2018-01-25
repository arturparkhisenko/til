// Abstract Classes

// Virtual functions can also have their implementation in the base class:

#include <iostream>
using namespace std;

class Enemy {
public:
  virtual void attack() { cout << "Enemy!" << endl; }
};

class Zombie : public Enemy {
public:
  void attack() { cout << "Zombie!" << endl; }
};

class Monster : public Enemy {
public:
  void attack() { cout << "Monster!" << endl; }
};

// Now, when you create an Enemy pointer, and call the attack() function, the
// compiler will call the function, which corresponds to the object's type, to
// which the pointer points:

int main() {
  Zombie n;
  Monster m;
  Enemy e;

  Enemy *e1 = &n;
  Enemy *e2 = &m;
  Enemy *e3 = &e;

  e1->attack();
  // Outputs "Zombie!"

  e2->attack();
  // Outputs "Monster!"

  e3->attack();
  // Outputs "Enemy!"
}
