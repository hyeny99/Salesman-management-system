
const SalesMan = require("../models/SalesMan");
const evalService = require("../services/eval-service");

module.exports={
/**
 * retrieves All SalesMan
 * @return {Promise<User>}
 */
    getAll:async (req)=>{
        //const _salesMan =await req.app.get('db').collection('salesMan');//get database from 
        return await SalesMan.find({});
    },
    findOne:async (req)=>{
        //const _salesMan =await req.app.get('db').collection('salesMan');//get database from 
        return await SalesMan.findOne({'sid':parseInt(req.body.sid)});
    },
    
    /**
    * Creating one sales Man
    * @param req express request
    * @return {Promise<SalesMan>}
   */
    addOne:async (req)=>{
           //const _salesMan =await req.app.get('db').collection('salesMan');//get database from express
           //console.log(body)
           /*const salesMan=new SalesMan(req.body.sid,req.body.name, req.body.department
           );*/

           const salesMan = new SalesMan(req.body);
           await salesMan.save(err => {
               if (err) {
                   if (err.name === 'MongoError' && err.code === 11000) {
                       return err;
                   }
               }
           });
        
           evalService.setOne(req.body.sid);
           
           
        // const salesMan={
        //     sid:req.body.sid,
        //     name:req.body.name,
        //     department:req.body.department,
        //     bonusSalary:req.body.bonusSalary || null
        // }
        // return (await SalesMan.update(salesMan)).insertedId;
    },
   /**
    * Delete one Sales Man
    * @return {Promise<}
    */
    deleteOne: async (req)=>{
       //const _salesMan =await req.app.get('db').collection('salesMan');//get database from
       return (await SalesMan.deleteOne({"sid": parseInt(req.params.sid)}))
    },

    updateOne: async (req)=>{

        // const updates = Object.keys(req.body);
        // const allowedUpdates = ['name', 'imagePath', 'department', 'bonusSalary'];

        // const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
   
        // if (!isValidOperation) {
        //     throw new Error();
        // }
       
        //const salesman = await SalesMan.findOne({ sid: req.params.sid });

        //console.log(salesman);
        //updates.forEach((update) => salesman[update] = req.body[update]);
    
        return await SalesMan.findOneAndUpdate({ 'sid': parseInt(req.params.sid) }, {
            'sid': req.params.sid,
            'name': req.body.name,
            'department': req.body.department,
            'bonusSalary': req.body.bonusSalary
        });

        //return (await SalesMan.updateOne({'sid': parseInt(req.body.sid)}, {$set: salesman}));

    
    //    const salesMan={
    //        sid:req.body.sid,
    //        name:req.body.name,
    //        department:req.body.department,
    //        bonusSalary:req.body.bonusSalary || null
    //    }
    //    return (await SalesMan.updateOne({'sid': parseInt(req.body.sid)}, {$set:salesMan}))
       
    },

    findBySid:  async (sid) => {
        const salesman = await SalesMan.findOne({ sid });
        return salesman;
    },

    findByDepartment: async (department) => {
        const salesmen = await SalesMan.find({ department });
        return salesmen;
    },

    findByName: async (name) => {
        const salesmen = await SalesMan.find({ name });
        return salesmen;
    },

    viewProfile: async (req) => {
        const salesman = await SalesMan.findOne({ sid: req.user.sid });
        return salesman;
    },


}
