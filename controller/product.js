const products = [];

exports.getAddProduct=(req,res,next)=>{
    res.render('admin/add-products',{pageTitle:'add-product',path:'/add-products'});
};

exports.postAddProduct=(req,res,next)=>{
    products.push({title: req.body.title});
    res.redirect('/');
};

exports.getProducts=(req,res,next)=>{ 
    res.render('shop/product-list',{
        prods:products,
        pageTitle:'shop',
        path:'/'});
};


// via class

// module.export = class product {
//     constructor(id,title,imageUrl, description,price){
//         this.id=id;
//         this.title=title;
//         this.imageUrl=imageUrl;
//         this.description=description;
//         this.price=price;
//     }

//     save(){
//         return db.execute('INSERT INTO products (title,price,imaegUrl,description) VALUES (?,?,?,?)',[this.title,this.price,this.imageUrl,this.description]);
//     }

//     static  deleteById(id){}

//     static fetchAll(){
//         return db.execute('SELECT * FROM products');
//     }
// }