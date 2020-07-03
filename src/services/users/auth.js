const logger = require('../../utils/logger');
const usersModel = require('../../models/users');

const getAllUser = async (payload) => {
    logger.info('get all user ja');
    const aa = await usersModel.getAllUsers();
    return aa;
}

const createUser = async (payload) => {
    console.log(payload);
    logger.info('create user ja');
    await usersModel.createUser(payload);
}

module.exports = {
    getAllUser,
    createUser
};