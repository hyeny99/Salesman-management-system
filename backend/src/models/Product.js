/**
 * @param {string} name 
 * @param {Array.<Customer>} customerList
 */
/*class Product {
    constructor(name, customerList){
        this.name = name;
        this.customerList=customerList;
    }
}*/
const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const Customer=require("./Customer");

// Create Our Schema
const ProductSchema = new Schema({
    name:{
        type:String,
        required:true,
        default: ""
    },
    customerList:{
        type:[Customer.Schema]
    }
});
const Product=mongoose.model('product', ProductSchema);
module.exports = {Schema:ProductSchema,Model:Product}