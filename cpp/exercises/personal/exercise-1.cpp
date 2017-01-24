// Проверить трехзначное число на четность,
// если число четное - найти сумму его цифр,
// если число нечетное - произведение его цифр.

#include <iostream>

using namespace std;

int main()
{
  int num;
  int result;

  cout << "Enter a 3 digits number: ";
  cin >> num;

  if (num < 100 || num > 999) {
    cout << "Sorry but only 3 digits number supported." << endl;
    return 0;
  }

  bool numIsEven = num % 2 == 0;

  int num1 = num / 100;
  int num2 = (num / 10) % 10;
  int num3 = num % 10;

  if (numIsEven) {
    result = num1 + num2 + num3;
    cout << "Summ of digits: " << result << endl;
  } else {
    result = num1 * num2 * num3;
    cout << "Multiplication of digits: " << result << endl;
  }

  return 0;
}
