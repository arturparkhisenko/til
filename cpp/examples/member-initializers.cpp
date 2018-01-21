// Member Initializers

// class MyClass {
//   public:
//    MyClass(int a, int b) {
//     regVar = a;
//     constVar = b;
//    }
//   private:
//     int regVar;
//     const int constVar;
// };

// Running this code returns an error, because one of its member variables is a constant, which cannot be assigned a value after declaration.

// can be replaced with

class MyClass {
 public:
  MyClass(int a, int b) : regVar(a), constVar(b)
  {
  }
 private:
  int regVar;
  const int constVar;
};
