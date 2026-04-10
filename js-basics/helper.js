// helper.js — export functions (CommonJS style)

function greet(name) {
    console.log(`Hello ${name}`);
  }
  
  const user = {
    username: 'tomsmith',
    password: 'SuperSecretPassword!'
  };
  
  function add(a, b) {
    return a + b;
  }
  
  // export at bottom
  module.exports = { greet, user, add };
  