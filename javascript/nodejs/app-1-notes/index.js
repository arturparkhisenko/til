const fs = require('fs');
const yargs = require('yargs');
const notes = require('./notes.js');

const options = {
  title: {
    describe: 'Title of note',
    demand: true, // required
    alias: 't'
  },
  body: {
    describe: 'Body of note',
    alias: 'b'
  }
};

// const argv = yargs.argv; // simple way
const argv = yargs
  .command('add', 'Add a new note', {
    title: options.title,
    body: options.body
  })
  .command('remove', 'Remove a note', {
    title: options.title
  })
  .command('list', 'List all notes', {})
  .command('read', 'Read a note', {
    title: options.title
  })
  .help()
  .argv;
// console.log(yargs.argv); // process.argv
const command = argv._[0]; // process.argv[2]
// console.log(`command: ${command}`);
let note = undefined;

switch (command) {
  case 'add':
    note = notes[command](argv.title, argv.body);
    if (note !== undefined) {
      console.log('Note created');
      notes.logNote(note);
    }
    break;

  case 'remove':
    const noteRemoved = notes[command](argv.title);
    console.log(`Note was${noteRemoved ?
      '' : ' not'} removed`);
    break;

  case 'list':
    let allNotes = notes[command]();
    console.log(`Printing ${allNotes.length} note(s):`);
    allNotes.forEach(note => notes.logNote(note));
    break;

  case 'read':
    note = notes[command](argv.title);
    if (note !== undefined) {
      notes.logNote(note);
    } else {
      console.log('Note not found');
    }
    break;

  default:
    notes.list();
    console.log('Command is not recognized');
}
