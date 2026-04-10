// Basic types
let siteName: string = 'SauceDemo';
let itemCount: number = 3;
let isVisible: boolean = true;
let browsers: string[] = ['chromium', 'firefox', 'webkit'];

console.log(siteName);
console.log(itemCount);
console.log(isVisible);
console.log(browsers);

// type — blueprint with = sign
type User = {
  username: string;
  password: string;
  role?: string;  // optional
};

const user1: User = { username: 'standard_user', password: 'secret_sauce' };
const user2: User = { username: 'admin', password: 'admin123', role: 'admin' };

console.log(user1.username);
console.log(user2.username);
console.log(user1.role);   // undefined — not provided
console.log(user2.role);   // admin

// interface — blueprint without = sign
interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

const backpack: Product = { name: 'Sauce Labs Backpack', price: 29.99, inStock: true };

console.log(backpack.name);
console.log(backpack.price);

// readonly — value can never change
type Config = {
  readonly baseURL: string;
  readonly browser: string;
};

const config: Config = { baseURL: 'https://www.saucedemo.com', browser: 'chromium' };

console.log(config.baseURL);
