// Exceptions

#include <iostream>
using namespace std;

// 1. throw:
// C++ exception handling is built upon three keywords: try, catch, and throw.
// throw is used to throw an exception when a problem shows up.
// For example:
int motherAge = 29;
int sonAge = 36;
if (sonAge > motherAge) {
  throw "Wrong age values";
}

// The code looks at sonAge and motherAge, and throws an exception if sonAge is
// found to be the greater of the two.
// In the throw statement, the operand determines a type for the exception. This
// can be any expression. The type of the expression's result will determine the
// type of the exception thrown.

// 2. catch:

// A try block identifies a block of code that will activate specific
// exceptions. It's followed by one or more catch blocks. The catch keyword
// represents a block of code that executes when a particular exception is
// thrown.
// Code that could generate an exception is surrounded with the try/catch block.
// You can specify what type of exception you want to catch by the exception
// declaration that appears in parentheses following the keyword catch.
// For example:

try {
  int motherAge = 29;
  int sonAge = 36;
  if (sonAge > motherAge) {
    throw 99;
  }
} catch (int x) {
  cout << "Wrong age values - Error " << x;
}

// Outputs "Wrong age values - Error 99"

// The try block throws the exception, and the catch block then handles it.
// The error code 99, which is an integer, appears in the throw statement, so it
// results in an exception of type int.
// Multiple catch statements may be listed to handle various exceptions in case
// multiple exceptions are thrown by the try block.

// 3 handling:
// Exception handling is particularly useful when dealing with user input.
// For example, for a program that requests user input of two numbers, and then
// outputs their division, be sure that you handle division by zero, in case
// your user enters 0 as the second number.
int main() {
  int num1;
  cout << "Enter the first number:";
  cin >> num1;

  int num2;
  cout << "Enter the second number:";
  cin >> num2;

  cout << "Result:" << num1 / num2;
}

// This program works perfectly if the user enters any number besides 0.
// In case of 0 the program crashes, so we need to handle that input.

// In the event that the second number is equal to 0, we need to throw an
// exception.
int main() {
  int num1;
  cout << "Enter the first number:";
  cin >> num1;

  int num2;
  cout << "Enter the second number:";
  cin >> num2;

  if (num2 == 0) {
    throw 0;
  }

  cout << "Result:" << num1 / num2;

  return 0;
}

// This code throws an exception with the code 0 of type integer.
// Next stop: Using the try/catch block to handle the exception!

// Now we need to handle the thrown exception using a try/catch block.
int main() {
  try {
    int num1;
    cout << "Enter the first number:";
    cin >> num1;

    int num2;
    cout << "Enter the second number:";
    cin >> num2;

    if (num2 == 0) {
      throw 0;
    }

    cout << "Result:" << num1 / num2;
  } catch (int x) {
    cout << "Division by zero!";
  }

  return 0;
}

// This results in the output of "Division by zero!" as an alternative to a
// program crash, when 0 is entered as the second number.

// In our case, we catch exceptions of type integer only. It's possible to
// specify that your catch block handles any type of exception thrown in a try
// block. To accomplish this, add an ellipsis (...) between the parentheses of
// catch:
try {
  // code
} catch (...) {
  // code to handle exceptions
}
