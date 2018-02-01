// member initializers

// This code returns an error:
// class MyClass {
//   public:
//    MyClass(int a, int b) {
//     regVar = a;
//     constVar = b; // cannot be assigned after declaration
//    }
//   private:
//     int regVar;
//     const int constVar; // yep, this is const
// };

// Proper way to do it with member initializers:

class MyClass {
public:
  MyClass(int a, int b) : regVar(a), constVar(b) {}

private:
  int regVar;
  const int constVar;
};
