#include <iostream>

using namespace std;

int main()
{
  int x = 5;
  int *ptr;
  ptr = &x;
  cout << "*ptr=" << *ptr << endl; // 5
  cout << "ptr=" << ptr << endl; // 0x7ffeed6357ec
  cout << "&ptr=" << &ptr << endl; // 0x7ffeed6357e0
  cout << "&*ptr=" << &*ptr << endl; // 0x7ffeed6357ec
}
