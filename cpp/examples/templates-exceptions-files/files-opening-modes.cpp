// Files Opening Modes

// An optional second parameter of the open function defines the mode in which
// the file is opened. This list shows the supported modes.

// Mode Param     | Description
//
// ios::app       | append to the end
// ios::ate       | open on end
// ios::binary    | open in binary mode
// ios::in        | open read only
// ios::out       | open write only
// ios::nocreate  | open fail if not exist
// ios::noreplace | open fail if already exists
// ios::trunc     | delete if exists

// All these flags can be combined using the bitwise operator OR (|).
// For example, to open a file in write mode and truncate it, in case it already
// exists, use the following syntax:
// ofstream outfile;
// outfile.open("file.dat", ios::out | ios::trunc );

// Reading from a File
// You can read information from a file using an ifstream or fstream object.
#include <fstream>
#include <iostream>
using namespace std;

int main() {
  string line;
  ifstream MyFile("test.txt");
  while (getline(MyFile, line)) {
    cout << line << '\n';
  }
  MyFile.close();

  return 0;
}

// The getline function reads characters from an input stream and places them
// into a string.
// The example above reads a text file and prints the contents to the screen.
// Our while loop uses the getline function to read the file line by line.
