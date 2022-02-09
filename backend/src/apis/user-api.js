const userService = require('../services/user-service');



// user create
exports.signup = function (req, res) {
    userService.add(req.body).then((token) => {
        res.status(201).send({token});
    }).catch((e) => {
        console.log(e);
        res.status(401).send('sign-up failed');
    });
};


// user account delete
exports.signout = function (req, res) {
    console.log(req.user);
    userService.delete(req.user).then(() => {
        res.send('Signed out successfully!');
    }).catch(e => {
        console.log(e);
        res.status(500).send('Signed out failed');
    });
}

exports.isSignedUp = function (req, res) {
    if(userService.isSignedUp(req.body)) {
        res.send({signedUp: true});
    }else {
        res.send({signedUp: false});
    }

}

// user login
exports.login = function (req, res){

    userService.login(req.body.username, req.body.password).then((token) => {
        //console.log(token);
        res.send({token}); 
    }).catch(e => {
        console.log(e);
        res.status(400).send('unable to login!');
    });
}


exports.logout = function (req, res) {
    userService.logout(req).then(() => {
        res.send('logout successfully!');
    }).catch(e => {
        console.log(e);
        res.status(500).send('logout failed!');
    })
}

exports.logoutAll = function (req, res) {
    userService.logoutAll(req).then((user) => {
        res.send({user});
       // res.send('logout all accounts successfully!');
    }).catch(e => {
        res.status(500).send('logout failed!');
    });
}



 exports.getSelf = async function(req, res){
    res.send(req.user); //retrieve userdata of authenticated user from session and return it
}

exports.updateProfile = async function (req, res) {
    userService.updateProfile(req).then(() => {
        res.send(req.user);
    }).catch(e => {
        console.log(e);
        res.status(400).send('update failed!');
    })
}

exports.signUpUpgrade = async function (req, res) {
    userService.updateToPro(req.user, req.body).then(() => {
        res.send('sign up successul!');
    }).catch(e => {
        console.log(e);
        res.status(401).send('sign up failed!');
    });
}


