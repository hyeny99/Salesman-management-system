const salesManService = require('../services/salesman-service');
module.exports = {
/**
 * endpoint, which handles Fetching All salesMan from the data base 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */

    // auth: admin
    fetchAllSalesMan:function (req, res){
        salesManService.getAll(req).then(result=>{
            res.status(200).send(result);
        })
       
     },
    createSalesMan: function(req, res){
        //console.log(req.body)
        salesManService.addOne(req).then(() => {
            res.status(201).send("Created");
        }).catch(err => {
            res.status(422).send({
                success: false,
                message: 'Duplicate Employee ID!'
            })
        });
    },

    deleteSalesMan: function(req, res){

        salesManService.deleteOne(req).then(result=>{
            res.status(200).send('Deleted');
        })
    },
    updateSalesMan: function(req, res){

        salesManService.updateOne(req).then(result => {
            res.status(200).send("Updated")
        })
    },

    findBySid: function (req, res) {
        salesManService.findBySid(req.query.sid).then(result => {
            res.send(result);
        }).catch(e => {
            res.status(404).send('not found!');
        });
    },

    findByDepartment: function (req, res) {
        salesManService.findByDepartment(req.query.department).then(result => {
            res.send(result);
        }).catch(e => {
            res.status(404).send('not found!');
        });
    },
    
    findByName: function (req, res) {
        salesManService.findByName(req.query.name).then(result => {
            res.send(result);
        }).catch(e => {
            res.status(404).send('not found!');
        });
    },


    // auth: salesman
    viewProfile: function (req, res) {
        salesManService.viewProfile(req).then((result) => {
            res.send(result);
        }).catch(e => {
            res.status(401).send(e);
        });
    },


}