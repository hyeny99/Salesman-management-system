const mongoose = require('mongoose');
const { mongo_domain,mongo_port, mongo_username, mongo_password, mongo_database  } = require('../../config');

const domain = mongo_domain;
const port = mongo_port;
const username = mongo_username;
const password = mongo_password;
const databaseName = mongo_database;

//preparing database credentials for establishing the connection:
let credentials = '';
if(username){
    credentials = username+':'+password+'@';
}

//connect to MongoDb
mongoose.connect('mongodb://' + credentials + domain + ':' + port + '/'+ databaseName).then(async () =>{ 
    console.log('DB connected.');
});