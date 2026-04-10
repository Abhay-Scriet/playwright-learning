import { test, expect } from '@playwright/test';
import { request } from 'http';

test.describe('API Tests', () => {

  // GET — read a user
  test('GET - get single user', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    console.log(body);
    
    expect(body.id).toBe(1);
    expect(body.name).toBe('Leanne Graham');
  });

});

  // POST — create new data
  test('POST - create user', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
      data: {
        name: 'Abhay Singh',
        email: 'abhay@test.com',
        username: 'abhay'
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    console.log(body);
    expect(body.name).toBe('Abhay Singh');
  });

  // PUT — update existing data
  test('PUT - update user', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/users/1', {
      data: {
        name: 'Abhay Updated'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe('Abhay Updated');
  });

  // DELETE — delete data
  test('DELETE - delete user', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/users/1');
    expect(response.status()).toBe(200);
  });
