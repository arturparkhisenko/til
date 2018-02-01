#include "birthday.h"
#include "person.h"
#include <iostream>
#include <string>
using namespace std;

Person::Person(string n, Birthday b) : name(n), bd(b) {}

void Person::printInfo() {
  cout << name << endl;
  bd.printDate();
}
