const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwt_secret } = require('../../config');

const isAdmin = async (req, res, next) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, jwt_secret);
        const user = await User.findOne({ username: decoded.username, 'tokens.token': token });
        

        if (!user || !user.isAdmin) {
            throw new Error();
        }

        req.token = token;
        req.admin = user;
        next();

    } catch (e) {
        res.status(401).send({ error: 'You are not authorized.' });
    }
};


module.exports = isAdmin;