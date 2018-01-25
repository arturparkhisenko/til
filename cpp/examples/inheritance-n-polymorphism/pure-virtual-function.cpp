// Pure Virtual Function

// In some situations you'd want to include a virtual function in a base class
// so that it may be redefined in a derived class to suit the objects of that
// class, but that there is no meaningful definition you could give for the
// function in the base class.
// The virtual member functions without definition are known as pure virtual
// functions. They basically specify that the derived classes define that
// function on their own.
// The syntax is to replace their definition by =0 (an equal sign and a zero):

class Enemy {
public:
  virtual void attack() = 0;
};

// The = 0 tells the compiler that the function has no body.

// If the pure virtual function is not overridden in the derived class, the code
// fails to compile and results in an error when you try to instantiate an
// object of the derived class.

// An abstract class is a class that has a pure virtual function
