#include <iostream>

using namespace std;

int main(int argc, const char *argv[]) {
  int x = 5;
  int *ptr;
  ptr = &x;
  cout << "*ptr=" << *ptr << endl;   // 5
  cout << "ptr=" << ptr << endl;     // 0x7ffeed6357ec
  cout << "&ptr=" << &ptr << endl;   // 0x7ffeed6357e0
  cout << "&*ptr=" << &*ptr << endl; // 0x7ffeed6357ec

  cout << "argc=" << argc << endl;   // 1
  cout << "argv=" << argv << endl;   // 0x7ffee2318910
  cout << "*argv=" << *argv << endl; // ./draft.o

  return 0;
}
