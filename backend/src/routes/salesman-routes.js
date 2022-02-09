const express = require('express');
const salesManRouter= express.Router();
const salesManApi = require('../apis/salesman-api');
const admin = require('../middlewares/admin');
const auth = require('../middlewares/auth');

salesManRouter.get('/', salesManApi.fetchAllSalesMan);

salesManRouter.get('/search/sid', salesManApi.findBySid);
salesManRouter.get('/search/department', admin, salesManApi.findByDepartment);
salesManRouter.get('/search/name', admin, salesManApi.findByName);


salesManRouter.post('/', salesManApi.createSalesMan)
salesManRouter.delete('/:sid', admin, salesManApi.deleteSalesMan)
salesManRouter.put('/:sid', salesManApi.updateSalesMan)


// salesman user
salesManRouter.get('/me', auth, salesManApi.viewProfile);
//salesManRouter.put('/me', auth, salesManApi.updateProfile);

module.exports= salesManRouter;