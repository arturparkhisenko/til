const db = require('./db');

module.exports.handleSignup = (email, password) => {
  // Check if email already exists

  // Save the user to the DB
  db.saveUser({email, password});

  // Send welcome email
};
