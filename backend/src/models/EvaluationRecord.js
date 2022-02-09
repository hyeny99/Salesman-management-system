/**
 * @Id
    @param {string} id
    @param {int} sid
    @param {Array.<Product>} productList
    @param {SocialPerformance} socialPerformance
 */
 /*class EvaluationRecord{
    constructor(sid,year,productList,socialPerformance){
        this.sid=sid;
        this.year=year;
        this.productList=productList;
        this.socialPerformance=socialPerformance;
    }
}*/
const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const Product=require("./Product");
const SocialPerformance=require('./SocialPerformance')
// Create Our Schema
const EvaluationRecordSchema = new Schema({
    sid:{
        type:Number,
        required:true,
        unique: true
    },
    productList:{
        type:[ Product.Schema ]
    },
    socialPerformance:SocialPerformance.Schema
    
});
const EvaluationRecord=mongoose.model('evaluationRecord', EvaluationRecordSchema);
module.exports = EvaluationRecord;