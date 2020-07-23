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
    const loginValidate = loginSchema.validate(payload);
    if(loginValidate.error)
        throw Error(loginValidate.error.message);
    const user = await usersModel.findUserByUsername(payload.username)
    if(user && user.password == payload.password){
        const exp_second = 86400000
        const token = await genAccessToken(user, exp_second)
        const refresh_token = token // temporary use refresh_token
        const expires = new Date(Date.now() + exp_second).toISOString();
        await usersModel.createToken(token, refresh_token, expires, user.id)
        return token
    } else {
        throw Error("Incorrect username or password");
    }
}

const logout = async (payload) => {
    logger.info('logout ja');
    await usersModel.removeToken(payload.authorization)
}

const getUserByToken = async (payload) => {
    const user = await usersModel.findUserByUsername(payload.username)
    return user;
}

const genAccessToken = async (user, exp_second) => {
    const JWT_SECRET_KEY = 'test';
    const userId = user.id;
    const username = user.username
    const tokenPayload = { userId, username };
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY, {expiresIn: exp_second + 's'});
    return accessToken;
}


module.exports = {
    getAllUsers,
    createUser,
    login,
    logout,
    getUserByToken,
    genAccessToken
};