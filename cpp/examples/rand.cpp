#include <cstdlib> // for rand and srand
#include <ctime>   // for time
#include <iostream>
using namespace std;

int main() {
  srand(time(0));
  // range 1 - 6
  for (int x = 1; x <= 10; x++) {
    cout << 1 + (rand() % 6) << endl;
  }
}
