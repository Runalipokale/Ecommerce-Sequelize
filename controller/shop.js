const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId } })
    .then(products => {
      res.render('shop/product-detail', {
        product: products[0],
        pageTitle: products[0].title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));

  // Product.findByPk(prodId)
  //   .then(product => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  // using sequelize association
  req.user
  .getCart()
  .then(cart=>{
    return cart.getProducts();
  })
  .then(products =>{
        res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
  })
  .catch(err=> console.log(err))  
  })
  .catch(err=> console.log(err))

  // this method is without the sequelize association
  // Cart.getCart(cart => {
  //   Product.findAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(prod => prod.id === product.id);
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });


};

exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId, product => {
//     Cart.addProduct(prodId, product.price);
//   });
//   res.redirect('/cart');
// }

//sequlize relation method
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  
  req.user
  .getCart()
  .then(cart=>{
    fetchedCart = cart;
    return cart.getProducts({where:{id:prodId}});
  })
  .then(products=>{
    let product;
    if(products.length>0){
      product = products[0]
  }

   if(product){
    const oldQuntity = product.cartItem.quantity;
     newQuantity = oldQuntity + 1;
     return product;
   }
   return Product.findByPk(prodId)
  })
  .then(product =>{
    return fetchedCart.addProduct(product,{
      through:{quantity:newQuantity}
     })
  })
  .then(()=>res.redirect('/cart'))
  .catch(err => console.log(err))
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.findByPk(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });

  //by association in sequelize
  req.user
  .getCart()
  .then(cart=>{
    return cart.getProducts({where:{id:prodId}})
  })
  .then(products=>{
    product = products[0]
    return product.cartItem.destroy()
  })
  .then((result)=>res.redirect('/cart'))
  .catch(err => console.log(err))
};

//placing order 
exports.postOrder = (req,res,next)=>{
  let fetchedCart;
  req.user
  .getCart() // this give access to the cart
  .then(cart=>{
    fetchedCart=cart;
    return cart.getProducts(); //getProducts give access to all products in cart
  })
  .then(products=>{
    return req.user
    .createOrder()
    .then(order =>{
      return order.addProduct(products.map(product =>{
        product.orderItem = {quantity:product.cartItem.quantity}
        return product;
      })//map =>javaScript array method which return a new array with slightly modified elements
  )
})
  .catch(err => console.log(err))
  })
   .then(result=>{
      return fetchedCart.setProducts(null);
    })
    .then(result=>{
      res.redirect('/orders');
    })
    .catch(err => console.log(err))
  }

exports.getOrders = (req, res, next) => {
  req.user
  .getOrders({include:['products']})
  .then(orders=>{
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });

  })
  .catch(err => console.log(err))
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};



