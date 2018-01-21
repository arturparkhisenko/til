#include "my-class.h"
#include <iostream>
using namespace std;

// define a particular class' member functions
// class::method, :: scope resolution operator

// implemented constructor
MyClass::MyClass() { cout << "Constructor" << endl; }

// implemented destructor
MyClass::~MyClass() { cout << "Destructor" << endl; }

// implemented method
void MyClass::myPrint() { cout << "Method" << endl; }
