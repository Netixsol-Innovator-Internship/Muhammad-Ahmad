const fetch = require('node-fetch');

const API = 'http://localhost:5000';

const run = async () => {
  // Register
  const regRes = await fetch(API + '/api/auth/register', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'CartTester', email: 'carttester@example.com', password: 'password' })
  });
  const reg = await regRes.json();
  const token = reg.token || (await (await fetch(API + '/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'carttester@example.com', password: 'password' }) })).then(r=>r.json())).token;
  console.log('Token:', !!token);

  // Fetch products
  const products = await (await fetch(API + '/api/products')).json();
  const firstId = products.items && products.items[0] && products.items[0]._id;
  if (!firstId) { console.error('No products found'); return; }

  // Add to cart
  const addRes = await fetch(API + '/api/cart', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ productId: firstId, qty: 2 }) });
  const add = await addRes.json();
  console.log('Add response items:', add && add.items && add.items.length);

  // Get cart
  const cart = await (await fetch(API + '/api/cart', { headers: { 'Authorization': 'Bearer ' + token } })).json();
  console.log('Cart total:', cart.total);
};

run().catch(err => console.error(err));
