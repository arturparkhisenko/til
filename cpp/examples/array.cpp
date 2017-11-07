#include <iostream>
#include <limits> // http://en.cppreference.com/w/cpp/types/numeric_limits
using namespace std; // cin, cout, rand

// --------------------------------------

void printArray(int *array, int size);
void inputArray(int *array, int size);

int getSizeFromInput();
int *getArr(int size);

class Arr {
public:
  int length;
  int *values;
  void setArr();
  void printArr();

private:
  void setLength();
  void showErr(string);
};

// MAIN ---------------------------------

int main() {
  int size = getSizeFromInput();
  int *array = new int[size];
  cout << "Input numbers: " << endl;
  inputArray(array, size);
  cout << "Array: " << endl;
  printArray(array, size);

  cout << "Input values: " << endl;
  int *arr = getArr(size);
  printArray(arr, size);

  Arr arr2;
  arr2.setArr();
  arr2.printArr();
  return 0;
}

// --------------------------------------

void printArray(int *array, int size) {
  cout << endl;
  for (int i = 0; i < size; i++) {
    cout << array[i] << endl;
  }
}

void inputArray(int *array, int size) {
  for (int i = 0; i < size; i++) {
    cin >> array[i];
  }
}

void showErrString(string message) {
  cout << message << endl;
  cin.clear();
  // streamsize: Type to represent sizes and character counts in streams.
  cin.ignore(numeric_limits<streamsize>::max(), '\n');
}

int getSizeFromInput() {
  int size;
  cout << "Enter size" << endl;
  cin >> size;
  while (cin.fail()) {
    showErrString("Size should be an integer");
    cin >> size;
  }
  return size;
}

int *getArr(int size) {
  int *arr = new int[size];
  int i = 0;
  while (i < size) {
    if (cin >> arr[i]) {
      i++;
    } else {
      showErrString("Array element should be an integer");
    }
  }
  return arr;
}

void Arr::showErr(string message) {
  cout << message << endl;
  cin.clear();
  cin.ignore(numeric_limits<streamsize>::max(), '\n');
}

void Arr::setLength() {
  int size = 0;
  cout << "Enter size" << endl;
  cin >> size;
  while (cin.fail()) {
    showErr("Size should be an integer");
    cin >> size;
  }
  length = size;
}

void Arr::setArr() {
  setLength();
  if (length > 0) {
    values = new int[length];
    cout << "Let's start feel array" << endl;
    int i = 0;
    while (i < length) {
      if (cin >> values[i])
        i++;
      else
        showErr("Array element should be an integer");
    }
  }
}

void Arr::printArr() {
  if (length && length > 0) {
    cout << "Your array values:" << endl;
    for (int i = 0; i < length; i++) {
      cout << values[i] << endl;
    }
  } else if (length == 0)
    cout << "Your array is empty because of it's zero length" << endl;
  else
    cout <<
      "To use this method you need specify array and it's length first"
      << endl;
}
