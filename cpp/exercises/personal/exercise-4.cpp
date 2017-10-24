// а) В обороте находятся банкноты k различных номиналов:
// a1, a2, ..., ak $. Банкомат должен выдать сумму в N $
// при помощи минимального количества банкнот или сообщить,
// что запрашиваемую сумму выдать нельзя. Будем считать,
// что запасы банкнот каждого номинала неограничены.
// б) Найти все возможные варианты выдачи этой суммы доступными купюрами.
// в) Как вариант а), но запасы банкнот каждого номинала ограничены

#include <iostream>

using namespace std;


int main()
{
  const int price = 2;
  // cid - cash in drawer
  // $ rating part: .1 / .25 / .5 / 1
  const int cid[4] = { 150, 6, 3, 6 };
  const float total = 10.5; // total
  float cash;
  cout << "Enter a cash count: ";
  cin >> cash;
  if (cash < 0.0 || cash > total) {
    cout << "Sorry but cash can't be < 0 or > total amount." << endl;
    return 0;
  }
  if (cash < price) {
    cout << "Sorry but it's not enought." << endl;
    return 0;
  }
  int remainder = cash - price;
  cout << to_string(remainder) << endl;


  return 0;
}
