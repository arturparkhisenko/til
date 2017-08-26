const fs = require('fs');
const dataFileName = 'data-notes.json';

const fetchNotes = () => {
  let notes = [];
  try {
    const notesString =
      fs.readFileSync(dataFileName);
    notes = JSON.parse(notesString);
  } catch (e) {
    console.log(`File ${dataFileName} doesn't exists`);
  }
  return notes;
};

const saveNotes = notes => {
  fs.writeFileSync(
    dataFileName, JSON.stringify(notes)
  );
};

const logNote = note => {
  console.log(`--- title: ${note.title} ---`);
  console.log(`body: ${note.body}`);
};

const add = (title, body = '') => {
  let notes = fetchNotes();
  const note = {
    title,
    body
  };
  let duplicateNotes = notes.filter(
    note => note.title === title
  );
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  } else {
    console.log('Duplicate Note title');
  }
};

const remove = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
};

const list = () => {
  return fetchNotes();
};

const read = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title === title);
  return filteredNotes[0];
};

module.exports = {
  add,
  remove,
  list,
  read,
  logNote
};
