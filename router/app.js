const path = require('path');

const express = require('express');
const bodyParser = require('body-parser'); 

const errController = require('../controller/error');
const sequelize = require('../utils/database');

const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');

const app = express();

app.use(express.static('views'));
app.use(express.static('public'));


// using template engine for dynamic content views
//using pug template engine
// app.set('view engine', 'pug'); 

app.set('view engine', 'ejs');
app.set('views','views'); 

const adminRoutes = require('../router/admin');
const shopRoutes = require('../router/shop');

app.use(bodyParser.urlencoded({extended:false})); //for passing body of request with application
app.use(express.static(path.join(__dirname, 'public')));// join path of public folder

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user =user;
        next();
    })
    .catch(err=>console.log(err));
})
app.use('/admin',adminRoutes); // for use admin.js data in this module
app.use(shopRoutes); // for use shop.js data in this module


// res,send method
// app.use((req,res,next)=>{
//     res.status(404).send("<P>Page not found</P>");   
//     res.end;
//  });
 

// another way to send 404 page not found err by adding html file path
app.use(errController.getError);

// following are the association (relation) between modules 
Product.belongsTo(User, {constraints:true , onDelete: 'CASCADE'}); 
//if one user delete then there associated (created) products also delete => CASCADE
User.hasMany(Product); // define one to many relationship in user and product using sequelize
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product , {through:CartItem}); // through => tell sequelize where this connection should be stored
Product.belongsToMany(Cart , {through:CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem});

sequelize
//sync() => This creates the table if it doesn't exist (and does nothing if it already exists)
// .sync({force:true}) //  force : true => delete the existing table and create new one 
.sync()
.then(result=>{
 return User.findByPk(1);
}) 
.then(user=>{
    if(!user){
        return User.create({name:'Runali',email:'runali@gmail.com'});
    }
    return user;  
})
.then(user=>{
    return user.createCart();
})
.then(cart=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
});

