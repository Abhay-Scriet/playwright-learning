// main.js — import from helper.js (CommonJS style)
const { greet, user, add } = require('./helper.js');

greet('Abhay');
console.log(`Username: ${user.username}`);
console.log(`Sum: ${add(5, 3)}`);
