#include <iostream>
using namespace std;

int main(int argc, const char *argv[]) {
  int x = 5;
  int *ptr = &x; // *pointer, & - denotes a reference
  int &ref = x; // &reference
  // The pointer points to the address location of the data.
  // You have to check if the pointed data is valid !== NULL.
  // The reference points to the data. Same as "left value".

  cout << "*ptr=" << *ptr << endl;   // 5
  cout << "ptr=" << ptr << endl;     // 0x7ffee8c2465c
  cout << "&ptr=" << &ptr << endl;   // 0x7ffee8c24650
  cout << "&*ptr=" << &*ptr << endl; // 0x7ffee8c2465c
  cout << "ref=" << ref << endl; // 5
  cout << "&ref=" << &ref << endl; // 0x7ffee8c2465c

  cout << "argc=" << argc << endl;   // 1
  cout << "argv=" << argv << endl;   // 0x7ffee8c24728
  cout << "*argv=" << *argv << endl; // ./draft.o

  return 0;
}
