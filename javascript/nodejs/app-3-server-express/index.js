const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

// template parts, usage {{> name}}
hbs.registerPartials(__dirname + '/views/partials');
// use hbs in views
app.set('view engine', 'hbs');
// middleware, order matters
app.use((req, res, next) => {
  // logger
  const now = new Date().toString();
  const log = `${now}: ${req.method} - ${req.url}\n`;
  console.log(log);
  fs.appendFile('server.log', log, err => {
    if (err) console.log(err);
  });

  next(); // required to continue
});

// maintenance, stops all
// app.use((req, res) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page',
//     message: 'Site is Updating 🚧'
//   });
// });

app.use(express.static(__dirname + '/public')); // after middlewares

// global functions
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

// routes
app.get('/', (req, res) => {
  // res.send('Hello express!');
  // res.send({
  //   name: 'Artur',
  //   likes: ['Books', 'Games']
  // });
  res.render('index.hbs', {
    pageTitle: 'Index Page',
    welcomeMessage: 'Welcome ;)',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

// start
app.listen(port, () => {
  console.log(`Server is up, port: ${port} and hbs v.${hbs.handlebars.VERSION}`);
});
