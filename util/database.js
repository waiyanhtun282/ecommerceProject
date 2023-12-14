const  Sequelize  = require('sequelize');


 const sequelize =new Sequelize('ecommerce-app','root','admin',{
    dialect:'mysql',
    host:'localhost'
 });

 module.exports =sequelize;


