#ifndef BIRTHDAY_H
#define BIRTHDAY_H

class Birthday {
public:
  Birthday(int m, int d, int y);
  void printDate();

private:
  int month;
  int day;
  int year;
};

#endif // BIRTHDAY_H
