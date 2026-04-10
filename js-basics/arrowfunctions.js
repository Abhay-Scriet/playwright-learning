//normal function
function greet(name){
 console.log(`hello${name}`);
}

//same function -arrow style
const greet2 = (name) => {
    console.log(`hello${name}`);
}

//even shorter - one line
const greet3 = (name) => console.log(`hello${name}`);

// Call all three — same result!
greet('Abhay');
greet2('Abhay');
greet3('Abhay');

// Arrow with return
const add = (a,b) => a+b ;
console.log(`Sum : ${add(5,3)}`);

// Arrow with object parameter

const login = (user) =>{
    console.log(`Username:${user.username}`);
    console.log(`Password:${user.password}`);
}

const user = { username: 'tomsmith', password: 'SuperSecretPassword!' };
login(user);