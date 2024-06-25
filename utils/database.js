// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node-tutorial',
//     password:'root123'
// });

// module.exports=pool.promise();


// sequelize database connection

const Sequelize = require('sequelize');

// sequelize is use for creating data objects --> database name , username , password
const sequelize = new Sequelize('node-tutorial','root','root123',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize; 