const express = require('express');
const port = process.env.PORT || 3000;

let app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/error', (req, res) => {
  res.status(404).send({
    error: 'Page not found.',
    name: 'ToDo'
  });
});

// start
app.listen(port, () => {
  console.log(`Server is up, port: ${port}`);
});

module.exports.app = app;
