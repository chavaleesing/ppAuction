const jwt = require("jsonwebtoken");
const Joi = require('@hapi/joi');

const logger = require('../../utils/logger');
const usersModel = require('../../models/users');


const newUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const getAllUsers = async (payload) => {
    logger.info('get all user ja');
    const aa = await usersModel.getAllUsers();
    return aa;
}

const createUser = async (payload) => {
    console.log(payload);
    logger.info('create user ja');
    const newUser = newUserSchema.validate(payload)
    if(newUser.error){
        throw Error(newUser.error.message);
    }
    await usersModel.createUser(payload);
}

const login = async (payload) => {
    logger.info('login ja');
    loginValidate = loginSchema.validate(payload);
    if(loginValidate.error)
        throw Error(loginValidate.error.message);
    user = await usersModel.getUserByUsername(payload.username)
    if(user && user.password == payload.password){
        token = jwt.sign(payload, 'SecretKey')
        refresh_token = jwt.sign(payload, 'SecretKey2')
        expires = new Date(Date.now() + 86400000).toISOString();
        await usersModel.createToken(token, refresh_token, expires, user.id)
        return user.username
    } else {
        throw Error("Incorrect username or password");
    }
}

const logout = async (payload) => {
    logger.info('logout ja');
    await usersModel.removeToken(payload.authorization)
}


module.exports = {
    getAllUsers,
    createUser,
    login,
    logout
};