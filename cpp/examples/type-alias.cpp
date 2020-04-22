#include <iostream>
using namespace std;

// define type aliases
typedef long int i32;
typedef long long int i64;
typedef float f32;
typedef double f64;

i64 toFahrenheit(f32 number)
{
  return ((number / 5) * 9) + 22;
}

f32 toCelsius(i64 number)
{
  return ((number - 32) * 5) / 9;
}

int main()
{
  cout << toFahrenheit(36.6) << endl;
  cout << toCelsius(70) << endl;

  return 0;
}
