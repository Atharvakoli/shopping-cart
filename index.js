const express = require('express');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Assignment');
});

// Arrays to perform operations
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// functions
function addToCart(req, res) {
  let name = req.query.name;
  let productId = parseInt(req.query.productId);
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let findProductIfExist = cart.find((cart) => cart.productId === productId);

  console.log(findProductIfExist);

  if (findProductIfExist) {
    res.json({ cartItems: 'CartId Already Exists..!' });
    return;
  }

  let newPorduct = {
    productId,
    name,
    price,
    quantity,
  };

  cart.push(newPorduct);
  res.json({ cartItems: cart });
}

function updateQuatityInCart(req, res) {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);

  let findById = cart.find((product) => product.productId === productId);

  if (!findById) {
    res.json({ cartItems: 'CartId NOT FOUND..!' });
    return;
  }

  findById.quantity = quantity;
  res.json(cart);
}

function deleteAnItem(req, res) {
  let productId = parseInt(req.query.productId);

  let findById = cart.find((product) => product.productId === productId);

  if (!findById) {
    res.json({ cartItems: 'CartId NOT FOUND..!' });
    return;
  }

  cart = cart.filter((product) => product.productId != productId);

  res.json(cart);
}

function getCart(req, res) {
  res.json(cart);
}

function getTotalQuantity(req, res) {
  let quantity = 0;

  for (let i = 0; i < cart.length; i++) {
    quantity += cart[i].quantity;
  }

  res.json({ totalQuantity: quantity });
}

function getTotalPrice(req, res) {
  let price = 0;

  for (let i = 0; i < cart.length; i++) {
    price += cart[i].price;
  }

  res.json({ totalPrice: price });
}

// routes
app.get('/cart/add', addToCart);
app.get('/cart/edit', updateQuatityInCart);
app.get('/cart/delete', deleteAnItem);
app.get('/cart', getCart);
app.get('/cart/total-quantity', getTotalQuantity);
app.get('/cart/total-price', getTotalPrice);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
