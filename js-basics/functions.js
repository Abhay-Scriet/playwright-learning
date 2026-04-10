//fuction useable block of code
function greet(name){
 console.log(`Hello ${name}!`);
}

//call function
greet ('Abhay');
greet('tomsmith');


function office(name){
    console.log(`my office  ${name}!`);
}

office('abc');
office('xyz');

//function with return value
function add(a,b){
    return a+b;
}

function adition(a,b){
   return(a+b);
}

function multiply(a,b){
    return (a*b);
}

function divide(a,b){
    return(a/b);
}

const sum = add(3,5);
const total =adition(8,9);
const product =multiply(3,7);
const dvd = divide(9,3);

console.log(`Sum:${sum}`);
console.log(`Total:${total}`);
console.log(`Product:${product}`);
console.log(`D:${dvd}`);

console.log(`Direct:${add(3,5)}`);

//function with object
function login(user){
    console.log(`logingin:${user.username}`);
    console.log(`Password:${user.password}`);
}

//parctice function

function school(name,bus){
    console.log(`School name:${name}`);
    console.log(`School bus:${bus}`);
}

school('Abc School','42');
school('XYZ school','15');

const user ={username:'tomsmith',password:'SuperSecretPassword!'
};
login(user);

// Multiple parameters practice
function testInfo(browser, url, username) {
  console.log(`Browser: ${browser}`);
  console.log(`URL: ${url}`);
  console.log(`User: ${username}`);
}

testInfo('chromium', '/login', 'tomsmith');
testInfo('firefox', '/dashboard', 'admin');

// Object parameter practice
function runTest(config) {
  console.log(`Running on: ${config.browser}`);
  console.log(`URL: ${config.url}`);
  console.log(`User: ${config.username}`);
}

const config1 = { browser: 'chromium', url: '/login', username: 'tomsmith' };
const config2 = { browser: 'firefox', url: '/dashboard', username: 'admin' };

runTest(config1);
runTest(config2);
