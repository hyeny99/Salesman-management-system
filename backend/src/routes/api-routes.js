const express = require('express');
const router = express.Router();

const user_routes = require('./user-routes');
const salesMan_routes = require('./salesman-routes');
const eval_routes = require('./eval-routes');


router.use('/salesMan', salesMan_routes);
router.use('/eval', eval_routes);
router.use('/', user_routes);


module.exports = router;