const logger = require('../../utils/logger');
const usersModel = require('../../models/users');

const getAllUser = async (payload) => {
    logger.info('get all user ja');
    const aa = await usersModel.getAllUsers();
    return aa;
}

module.exports = getAllUser;