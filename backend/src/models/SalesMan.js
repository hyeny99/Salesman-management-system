
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const BonusSalary = require("./BonusSalary");

const BonusSalarySchema = new Schema({
    year:{
        type:Number,
        default: 0,
        required:true
    },
     value:{
         type:Number,
         default: 0,
         required:true
     },
 });


// Create Our Schema
const SalesManSchema = new Schema({
    sid:{
        type:Number,
        required:true,
        unique: true
    },
    imagePath: {
        type: String,
        required: false,
        default: 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png'
    },
    name:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    bonusSalary: [{
        type: BonusSalarySchema,
    }]
});



const SalesMan=mongoose.model('salesMan', SalesManSchema);
module.exports = SalesMan;