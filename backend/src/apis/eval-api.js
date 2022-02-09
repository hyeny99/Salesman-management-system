const evlService = require('../services/eval-service');
module.exports = {
/**
 * endpoint, which handles Fetching All salesMan from the data base 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
    fetchAllEvls:function (req, res){
        evlService.getAll(req).then(result=>{
            res.status(200).send(result);
        })
       
     },
    createEvl: function(req, res){
        //console.log(req.body)
        evlService.addOne(req).then(resutl=>{
            res.status(201).send("Created");
        })
    },
    deleteEvl: function(req, res){

        evlService.deleteOne(req).then(result=>{
            res.status(200).send('Deleted');
        })
    },
    updateEvl: function(req, res){

        evlService.updateOne(req).then(result=>{
            res.status(200).send("Updated")
        })
    },
    getOneEvl: function(req, res){

        evlService.findOne(req).then(result=>{
            res.status(200).send(result)
        })
    }
}