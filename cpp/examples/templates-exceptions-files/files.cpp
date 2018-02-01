// Working with files

// Another useful C++ feature is the ability to read and write to files. That
// requires the standard C++ library called fstream.
// Three new data types are defined in fstream:
// ofstream: Output file stream that creates and writes information to files.
// ifstream: Input file stream that reads information from files.
// fstream: General file stream, with both ofstream and ifstream capabilities
// that allow it to create, read, and write information to files.

// To perform file processing in C++, header files <iostream> and <fstream> must
// be included in the C++ source file.
#include <fstream>
#include <iostream>
using namespace std;

// 1. open

// A file must be opened before you can read from it or write to it.
// Either the ofstream or fstream object may be used to open a file for writing.
// Let's open a file called "test.txt" and write some content to it:

int main() {
  ofstream MyFile;
  MyFile.open("test.txt");

  MyFile << "Some text. \n";

  return 0;
}

// The above code creates an ofstream object called MyFile, and uses the open()
// function to open the "test.txt" file on the file system. As you can see, the
// same stream output operator is used to write into the file.
// If the specified file does not exist, the open function will create it
// automatically.

// 2. close

// When you've finished working with a file, close it using the member function
// close().

int main() {
  ofstream MyFile;
  MyFile.open("test.txt");

  MyFile << "Some text! \n";
  MyFile.close();

  return 0;
}

// Running this code will cause a "test.txt" file to be created in the directory
// of your project with "Some text!" written in it.
// You also have the option of specifying a path for your file in the open
// function, since it can be in a location other than that of your project.

// 3.

// You can also provide the path to your file using the ofstream objects
// constructor, instead of calling the open function.

int main() {
  ofstream MyFile("test.txt");

  MyFile << "This is awesome! \n";
  MyFile.close();

  return 0;
}

// As with the open function, you can provide a full path to your file located
// in a different directory.

// Under certain circumstances, such as when you don't have file permissions,
// the open function can fail.
// The is_open() member function checks whether the file is open and ready to be
// accessed.

int main() {
  ofstream MyFile("test.txt");

  if (MyFile.is_open()) {
    MyFile << "This is awesome! \n";
  } else {
    cout << "Something went wrong";
  }
  MyFile.close();

  return 0;
}
