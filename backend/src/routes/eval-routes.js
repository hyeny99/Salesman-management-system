const express = require('express');
const EvlRouter= express.Router();
const EvlApi = require('../apis/eval-api');

EvlRouter.get('/', EvlApi.fetchAllEvls);
EvlRouter.post('/', EvlApi.createEvl);
EvlRouter.get('/:sid',EvlApi.getOneEvl);
EvlRouter.delete('/:sid',EvlApi.deleteEvl);
EvlRouter.put('/',EvlApi.updateEvl);


module.exports= EvlRouter;