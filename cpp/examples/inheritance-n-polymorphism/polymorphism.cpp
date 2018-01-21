// Polymorphism - a single function can have a number of different
// implementations

#include <iostream>
using namespace std;

class Enemy {
protected:
  int attackPower;

public:
  void setAttackPower(int a) { attackPower = a; }
};

class Zombie : public Enemy {
public:
  void attack() { cout << "Zombie! - " << attackPower << endl; }
};

class Monster : public Enemy {
public:
  void attack() { cout << "Monster! - " << attackPower << endl; }
};

int main() {
  Zombie n;
  Monster m;
  Enemy *e1 = &n;
  Enemy *e2 = &m;

  e1->setAttackPower(95);
  e2->setAttackPower(70);

  n.attack();
  m.attack();
}

/* Output:
Zombie! - 95
Monster! - 70
*/
