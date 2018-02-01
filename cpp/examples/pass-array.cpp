#include <iostream>
using namespace std;

void printArray(int arr[], int size) {
  for (int x = 0; x < size; x++) {
    cout << arr[x] << endl;
  }
}
int main() {
  int myArr[3] = {3, 6, 9};
  printArray(myArr, 3);
  return 0;
}
