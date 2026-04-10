//simple array
const browsers = ['chromium','firefox','webkit'];
const users = ['tomsmith','admin','guest'];


//access by index(start at 0!)
console.log(browsers[0]);
console.log(browsers[1]);
console.log(browsers[2]);

// Array length

console.log(`All browser:${browsers.length}`);

// Loop through array

for (const browser of browsers){
    console.log(`Browser:${browser}`);
}

// Array of objects

const testusers = [
    {username:'tomsmith',password:'SuperSecretPassword!'},
    {username:'admin',password:'admin123'},
    {username:'guest',password:'guest123'},
];

// Access object inside array

console.log(testusers[0].username);
console.log(testusers[1].username);
console.log(testusers[2].username);


// Loop through array of objects

for (const user of testusers){
    console.log(`User:${user.username},Pass:${user.password}`);
}
