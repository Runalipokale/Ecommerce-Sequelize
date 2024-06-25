
// this is method for creating cart = > this method oriented to class and constructor 
// const fs = require('fs');
// const path = require('path');

// // for storing importatnt data in json format
// const p = path.join(path.dirname(process.mainModule.filename),'data','cart.json');


// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     // Fetch the previous cart
//     //using fs for reading previous fiels data
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err) {
//         cart = JSON.parse(fileContent);
//       }
      
//       // Analyze the cart => Find existing product
//       const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;

//       // Add new product/ increase quantity
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct }; //object spread operator => it will take all the properties of existing product 
//         updatedProduct.qty = updatedProduct.qty + 1; // old quntity increase by 1
//         cart.products = [...cart.products]; 
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id: id, qty: 1 }; // id and quantity remains same
//         cart.products = [...cart.products, updatedProduct]; // cart = cartProducts + updatedProduct
//       }
//       cart.totalPrice = cart.totalPrice + +productPrice; //use + + sign for converting string to number and them
//       fs.writeFile(p, JSON.stringify(cart), err => {
//         console.log(err);
//       });
//     });
//   }

//   static deleteProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         return;
//       }
//       const updatedCart = { ...JSON.parse(fileContent) };
//       const product = updatedCart.products.find(prod => prod.id === id);
//       if (!product) {
//           return;
//       }
//       const productQty = product.qty;
//       updatedCart.products = updatedCart.products.filter(
//         prod => prod.id !== id
//       );
//       updatedCart.totalPrice =
//         updatedCart.totalPrice - productPrice * productQty;

//       fs.writeFile(p, JSON.stringify(updatedCart), err => {
//         console.log(err);
//       });
//     });
//   }

//   static getCart(cb) {
//     fs.readFile(p, (err, fileContent) => {
//       const cart = JSON.parse(fileContent);
//       if (err) {
//         cb(null);
//       } else {
//         cb(cart);
//       }
//     });
//   }
// };


// this is second method in which we use sequelize 
const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Cart = sequelize.define('cart',{
   id:{
     type:Sequelize.INTEGER,
     autoIncrement:true,
     allowNull:false,
     primaryKey:true
   }

});

module.exports =  Cart;