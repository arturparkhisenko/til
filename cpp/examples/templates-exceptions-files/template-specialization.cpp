// Template Specialization

// In case of regular class templates, the way the class handles different data
// types is the same; the same code runs for all data types.
// Template specialization allows for the definition of a different
// implementation of a template when a specific type is passed as a template
// argument.

#include <iostream>
using namespace std;

// For example, we might need to handle the character data type in a different
// manner than we do numeric data types.
// To demonstrate how this works, we can first create a regular template.

template <class T> class MyClass {
public:
  MyClass(T x) { cout << x << " -  not a char" << endl; }
};

// To specify different behavior for the data type char, we would create a
// template specialization.

template <> class MyClass<char> {
public:
  MyClass(char x) { cout << x << " is a char!" << endl; }
};

// First of all, notice that we precede the class name with template<>,
// including an empty parameter list. This is because all types are known and no
// template arguments are required for this specialization, but still, it is the
// specialization of a class template, and thus it requires to be noted as such.

// But more important than this prefix, is the <char> specialization parameter
// after the class template name. This specialization parameter itself
// identifies the type for which the template class is being specialized (char).
// In the example above, the first class is the generic template, while the
// second is the specialization.
// If necessary, your specialization can indicate a completely different
// behavior from the behavior of your the generic template.

int main() {
  MyClass<int> ob1(42);
  MyClass<double> ob2(5.47);
  MyClass<char> ob3('s');

  return 0;
}

/* Output:
42 - not a char
5.47 - not a char
s is a char!
*/

// As you can see, the generic template worked for int and double. However, our
// template specialization was invoked for the char data type.
// Keep in mind that there is no member "inheritance" from the generic template
// to the specialization, so all members of the template class specializations
// must be defined on their own.
