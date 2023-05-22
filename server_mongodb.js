// const express = require('express');
// const MongoClient = require('mongodb').MongoClient;

// const app = express();

// const path = 'mongodb://localhost:27017';
// const databaseName = 'shopping';
// const CName = 'products';

// MongoClient.connect(path, (err, client) => {
//   if (err) {
//     console.log('Error occured', err);
//     return;
//   }
  
//   console.log('Connected to MongoDB successfully');
  
//   const db = client.db(databaseName);
//   const collection = db.collection(CName);
  

//   app.get('/', (req, res) => {
//     res.send('Welcome to the Ecommerce Website!');
//   });
  
//   app.get('/products', (req, res) => {
//     collection.find().toArray((err, products) => {
//       if (err) {
//         console.log('Error occured', err);
//       }
      
//       res.json(products);
//     });
//   });
  
//   app.post('/products', (req, res) => {
//     const product = req.body;
//     collection.insertOne(product, (err, result) => {
//       if (err) {
//         console.log('Error Occured', err);
//       }
      
//       res.json('Data added!');
//     });
//   });
  
//   app.listen(3000, () => {
//     console.log("Server started!");
//   });
// });


const express = require('express');
var bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb+srv://anikacharjee:anik1990@clusterecom.82qsfz1.mongodb.net/";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const databaseName = 'shopping';
const collectionName = 'products';

client.connect((err) => {
    if (err) {
      console.log('Error occurred', err);
      return;
    }
  
    console.log('Connected to MongoDB Atlas successfully');
  
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);
  
    app.get('/', (req, res) => {
      res.send('Welcome to the Ecommerce Website!');
    });
  
    app.get('/products', (req, res) => {
      collection.find().toArray((err, products) => {
        if (err) {
          console.log('Error occurred', err);
        }
  
        res.json(products);
      });
    });
  
    app.post('/products', (req, res) => {
      const product = req.body;
      collection.insertOne(product, (err, result) => {
        if (err) {
          console.log('Error occurred', err);
        }
  
        res.json('Data added!');
      });
    });
  
    app.put('/products/:product_id', (req, res) => {
      const productId = req.params.product_id;
      const updatedProduct = req.body;
      collection.updateOne(
        { _id: mongodb.ObjectId(productId) },
        { $set: updatedProduct },
        (err, result) => {
          if (result.matchedCount > 0) {
            res.json('Product Updated');
          } else {
            res.json('Product Not found' );
          }
        }
      );
    });

    app.listen(3000, () => {
      console.log('Server started!');
    });
  });
  


