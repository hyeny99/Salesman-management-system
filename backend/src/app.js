const express = require('express');
const session = require('express-session');
const mongoose = require('./db/mongoose');
const {port} = require('../config');

// const multer = require('multer');
// const upload = multer();
const app = express();
// const crypto = require('crypto');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(upload.array()); // supports multipart/form-data bodies

// app.use(session({
//     secret: crypto.randomBytes(32).toString('hex'),
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false
//     }
// }))

// to fix: start webserver, after database-connection was established
app.listen(port, () => { 
    console.log('Webserver started.');
});



// const SeedDB=async()=>{
//     const User=require('./models/User')
//     if(await User.count() < 1){
//     const userService = require('./services/user-service');
//     const adminPassword = crypto.randomBytes(8).toString('base64');
//     await userService.add(
//         {
//             username:'admin',
//             firstname:' ',
//             lastname:'admin',
//             email:' ',
//             password: adminPassword,
//             role: 'admin'}
//         );
    

//     console.log('created admin user with password: '+ adminPassword);
 
//     }
// }


// SeedDB();

const seedDB = async () => {
    const User = require('./models/User');
    if (await User.count() < 1) {
        const userService = require('./services/user-service');
        await userService.add (
            {
                username: 'admin',
                firstname: 'admin',
                lastname: 'admin',
                email: 'admin@gmail.com',
                password: 'adminSignup',
                sid: 0001,
                isAdmin: true
            }
        )
    }

    const SalesMan = require("./models/SalesMan");
    const orangeHRMAdapter = require ('./adapters/orangeHRMAdapter');
    const SalesMen = await orangeHRMAdapter.loadSalesMen();
    await SalesMan.insertMany(SalesMen); //insert salesmen from OrangeHRM into the database
   
    const EvaluationRecord = require('./models/EvaluationRecord');
    const openCRXAdapter = require ('./adapters/openCRXAdapter'); 
    const evaluationRecord = await openCRXAdapter.loadEvalutionRecord();
    await EvaluationRecord.insertMany(evaluationRecord);

    SalesMen.forEach(salesman => {
        evalService.setOne(salesman.sid);
    });
    

    const bonus_service = require('./services/bonus-service');
    const evals = await EvaluationRecord.find();
    evals.forEach(eval => { 
        bonus_service.calculateBonus(eval.sid);

    });
}

seedDB();

const apiRouter = require('./routes/api-routes');
const salesmanService = require('./services/salesman-service');
const evalService = require('./services/eval-service');
app.use('/api', apiRouter);


