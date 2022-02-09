const express = require('express');
const router = express.Router();


const userApi = require('../apis/user-api');
const auth = require('../middlewares/auth');

router.post('/login', userApi.login);
router.post('/logout', auth, userApi.logout); //user logout
router.post('/logoutAll', auth, userApi.logoutAll);


router.post('/sign-up', userApi.signup); // create a new user (default)
router.get('/sign-up', userApi.isSignedUp);

router.get('/me', auth, userApi.getSelf); 
router.put('/me', auth, userApi.updateProfile);
router.delete('/me', auth, userApi.signout);

module.exports = router;


