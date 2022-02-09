const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../../config');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    firstname:{
        type:String,
        required:true,
        trim: true
    },
    lastname:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('invalid email!');
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate (value) {
            // if (!value.toLowerCase().matches('/[a-z]/g')) {
            //     throw new Error('password should contain alphanumeric characters!');
            // }

            if(value.toLowerCase().includes('password')) {
                throw new Error('password cannot contain "password"');
            }
        }
    },
    sid: {
        type: Number,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ username: user.username }, jwt_secret);


    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}

UserSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

// Hash the plain text password before saving
UserSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;