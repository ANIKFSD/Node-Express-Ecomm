const express = require('express');

var app =express();

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
    res.json("Data added!");
});

app.listen(3000, () => {
    console.log("Server started");
});