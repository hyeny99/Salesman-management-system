const bcrypt = require('bcryptjs');
const { get } = require('http');
const User = require('../models/User')


// default user create (sign-up)
exports.add = async function (userInfo){
    const user = new User(userInfo);
    console.log(user);
    
    await user.save();
    const token = await user.generateAuthToken();
    return (user, token);  
    
}


// user login
exports.login = async function (username, password) {
    try {
        const user = await User.findByCredentials(username, password);
    
        const token = await user.generateAuthToken();
        return (user, token);
    } catch (e) {
        throw new Error(e);
    }
 
}

// user logout
exports.logout = async function (data) {
    try {
        data.user.tokens = data.user.tokens.filter((token) => {
            return token.token !== data.token;
        })
        return await data.user.save();
    } catch (e) {
        return e;
    }      
}

exports.logoutAll = async function (data) {
    try{
        data.user.tokens = [];
        await data.user.save();
        return data.user;
    } catch(e) {
        return e;
    }
}

exports.get = async function (username){
    return await User.findOne({username: username});
}

exports.isSignedUp = async function (user) {
    userFound = await this.get(user.username);
    return userFound? true: false;   
}

// sign out
exports.delete = async function (user) {
    try {
        await user.remove();
    } catch (e) {
        throw new Error(e);
    }
}

exports.updateProfile = async function (data) {

    const updates = Object.keys(data.body);
    const allowedUpdates = ['username','firstname', 'lastname', 'email', 'password'];
    
   
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return new Error();
    }
   
    updates.forEach((update) => data.user[update] = data.body[update]);

    return await data.user.save();
    
}








