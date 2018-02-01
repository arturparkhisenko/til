// Virtual Functions

// The previous example demonstrates the use of base class pointers to the
// derived classes. Why is that useful? Continuing on with our game example, we
// want every Enemy to have an attack() function.
// To be able to call the corresponding attack() function for each of the
// derived classes using Enemy pointers, we need to declare the base class
// function as virtual.
// Defining a virtual function in the base class, with a corresponding version
// in a derived class, allows polymorphism to use Enemy pointers to call the
// derived classes' functions.
// Every derived class will override the attack() function and have a separate
// implementation:

#include <iostream>
using namespace std;

class Enemy {
public:
  virtual void attack() {}
};

class Zombie : public Enemy {
public:
  void attack() { cout << "Zombie!" << endl; }
};

class Monster : public Enemy {
public:
  void attack() { cout << "Monster!" << endl; }
};

// -------------------------------

int main() {
  Zombie n;
  Monster m;
  Enemy *e1 = &n;
  Enemy *e2 = &m;

  e1->attack();
  e2->attack();

  return 0;
}

/* Output:
Zombie!
Monster!
*/
