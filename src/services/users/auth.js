const jwt = require("jsonwebtoken")

const logger = require('../../utils/logger');
const usersModel = require('../../models/users');


const getAllUsers = async (payload) => {
    logger.info('get all user ja');
    const aa = await usersModel.getAllUsers();
    return aa;
}

const createUser = async (payload) => {
    console.log(payload);
    logger.info('create user ja');
    await usersModel.createUser(payload);
}

const login = async (payload) => {
    logger.info('login ja');
    user = await usersModel.getUserByUsername(payload.username)
    if(user.password == payload.password){
        token = jwt.sign(payload, 'SecretKey')
        expires = new Date(Date.now() + 86400000).toISOString();
        await usersModel.createToken(token, expires, user.id)
        return user.username
    } else {
        return null
    }
}


module.exports = {
    getAllUsers,
    createUser,
    login
};