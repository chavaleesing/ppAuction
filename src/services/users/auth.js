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
    if(user && user.password == payload.password){
        token = jwt.sign(payload, 'SecretKey')
        expires = new Date(Date.now() + 86400000).toISOString();
        await usersModel.createToken(token, expires, user.id)
        return user.username
    } else {
        return null
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