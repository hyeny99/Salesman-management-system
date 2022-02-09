/**
 * This is the Customer Data Class
 * @param {string} clientName
 * @param {int} itemsSold
 * @param {string} ranking
 */
/*class Customer {
    constructor (clientName, itemsSold, ranking){
        this.clientName=clientName;
        this.itemsSold=itemsSold;
        this.ranking=ranking;
    }
}*/
const mongoose =require("mongoose");
const Schema = mongoose.Schema;


// Create Our Schema
const CustomerSchema = new Schema({
    clientName:{
        type:String,
        required:true
    },
    itemsSold:{
        type:Number,
        required:true
    },
    ranking:{
        type:String,
        required:true
    },
});
const Customer=mongoose.model('customer', CustomerSchema);
module.exports ={Schema:CustomerSchema,Model:Customer}