const express = require('express');

var app =express();

app.use(express.json());

var products = [
    {
        "id": 1,
        "name": "product1_name",
        "price": 24.88,
        "description": "Description of the product1_name"
    },
    {
        "id": 2,
        "name": "product2_name",
        "price": 24.88,
        "description": "Description of the product2_name" 
    }
];

app.get('/', (req,res) => {
    res.send("Welcome to the Ecommerce Website!");
});


app.get('/products', (req,res) => {
    res.json(products);
});

app.post('/products', (req,res) => {
    const product = req.body;
    products.push(product);
    res.json("Data added!");
});

app.put('/products/:product_id', (req,res) => {
    const productId = parseInt(req.params.product_id);
    const updatedProduct = req.body;
    const productIndex = products.findIndex(product => product.id === productId)

    if(productIndex !== -1) {
        products[productIndex] = updatedProduct;
        res.json("Product Updated");
    } else {
        res.json("Product Not found");
    }
});


let cart = [];

app.post('/cart/add/:product_id', (req, res) => {
const productId = parseInt(req.params.product_id);
  
const product = products.find(product => product.id === productId);
  
    if (product) {
      if (!cart.includes(product)) {
        cart.push(product);
        res.json({ message: 'Product added to the cart successfully.' });
      } else {
        res.json({ error: 'Product already exists in the cart.' });
      }
    } else {
      res.json({ error: 'Product not found.' });
    }
  });

app.get('/cart', (req, res) => {
    if (cart.length > 0) {
      res.json({ cart });
    } else {
      res.json({ message: 'The cart is empty.' });
    }
});
    
app.delete('/cart', (req, res) => {
    cart = [];
    res.json({ message: 'Cart cleared successfully.' });
  });



let orders = [];

app.post('/orders', (req, res) => {
    const order = { cart };
    orders.push(order);
    cart = [];
    res.json({ message: 'Order placed successfully.' });
  });

  
app.get('/orders', (req, res) => {
    res.json(orders);
});


app.put('/orders/:order_index', (req, res) => {
    const orderIndex = parseInt(req.params.order_index);
    const updatedOrder = req.body;
  
    if (orderIndex >= 0 && orderIndex<orders.length) {
      orders[orderIndex] = updatedOrder;
      res.json({ message: 'Order updated successfully.' });
    } else {
      res.json({ error: 'Order index is out of range.' });
    }
});
  
  
app.listen(3000, () => {
    console.log("Server started");
});