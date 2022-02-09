
const Evl = require("../models/EvaluationRecord")
const Product=require("../models/Product")
const SocialPerformance=require("../models/SocialPerformance")
module.exports={
/**
 * retrieves All SalesMan
 * @return {Promise<User>}
 */
    getAll:async (req)=>{
        //const _Evl =await req.app.get('db').collection('EvaluationRecord');//get database from 
        return await Evl.find({});
    },
    findOne:async (req)=>{
        //const _Evl =await req.app.get('db').collection('EvaluationRecord');//get database from 
        return await Evl.findOne({'sid':parseInt(req.params.sid)});
      
        
    },
/**
 * Creating one sales Man
 * @param req express request
 * @return {Promise<SalesMan>}
*/
    addOne:async (req)=>{
        //const _Evl =await req.app.get('db').collection('EvaluationRecord');//get database from express
        //console.log(body)
        const Ev={
            sid:req.body.sid,
            productList:req.body.productList,
            socialPerformance:req.body.socialPerformance
            };
        return await Evl.insertMany(Ev);
    },
    
    setOne:async (sid) => {
        if (!await Evl.findOne({'sid': sid})) {

            const Ev = {
                sid,
                productList: [],
                socialPerformance: null
            };

            return await Evl.insertMany(Ev);
        }
    },
/**
 * Delete one Sales Man
 * @return {Promise<}
 */
 deleteOne: async (req)=>{
    //const _Evl =await req.app.get('db').collection('EvaluationRecord');//get database from
    return (await Evl.deleteOne({"sid": parseInt(req.params.sid)}))
 },
 updateOne: async (req)=>{
    //const _Evl =await req.app.get('db').collection('EvaluationRecord');//get database from
    const Ev={
        sid:req.body.sid,
        productList:req.body.productList,
        socialPerformance:req.body.socialPerformance
        };
    return (await Evl.updateOne({'sid': parseInt(req.body.sid)}, {$set:Ev}))
 }
}
