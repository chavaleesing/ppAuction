const logger = require('../../utils/logger');
const usersModel = require('../../models/users');

const findUser = async (payload) => {
    logger.info('get user ja');
    const aa = await usersModel.getUser();
    return aa;
}

module.exports = findUser;