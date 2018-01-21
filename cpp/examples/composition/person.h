#ifndef PERSON_H
#define PERSON_H

#include <string>
using namespace std;

class Person {
public:
  Person(string n, Birthday b);
  void printInfo();

private:
  string name;
  Birthday bd;
};

#endif // PERSON_H
