//intead of separate variables:
//const username = 'tomsmith';
//const password = 'SuperSecretPassword!';
//const role = 'admin';

//Group them in one object;
const user = {
  username: 'tomsmith',
  password: 'SuperSecretPassword!',
  role: 'admin'
};

//access value using dot notation
console.log(user.username); //tomsmith
console.log(user.password); //SuperSecretPassword
console.log(user.role); //admin

//template literal with object
console.log(`Username: ${user.username}`);
console.log(`Password:${user.password}`);
console.log(`Role: ${user.role}`);

//Multiple objects
const adminUser ={
    username : 'admin',
    password : 'admin123',
};

const guestUser = {
    username : 'guest',
    password : 'guest123'

};

console.log(`Username:${adminUser.username}`);
console.log(`Password:${adminUser.password}`);
console.log(`Username:${guestUser.username}`);
console.log(`Password:${guestUser.password}`);

/*Object = group of related values
{ }    = object
key: value = each item inside*/

//multiple parameters practice
function testInfo(browser, url, username){
    console.log(`Browser:${browser}`);
    console.log(`URL:${url}`);
    console.log(`Username:${username}`);
}

testInfo('chromium', '/login', 'tomsmith');
testInfo('firefox', '/dashboard', 'admin');

//object parameter practice

function runTest(config){
    console.log(`running on:${config.browser} `);
    console.log(`URL:${config.url}`);
    console.log(`User: ${config.username}`);


}

const config1 = {
    browser: "chromium",
    url: '/login',
    username: "tomsmith"
};


const config2 = {
    browser: 'firefox',
    url: '/dashboard',
    username: 'admin'
  };

  runTest(config1);
  runTest(config2);
