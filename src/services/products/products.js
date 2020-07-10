const Joi = require('@hapi/joi');

const logger = require('../../utils/logger');
const productsModel = require('../../models/products');
const authService = require('../../services/users/auth')


const addProduct = async (payload) => {
    logger.info('addProduct ja');
    const user_id = await authService.getUserByToken(payload)
    payload.user_id = user_id
    await productsModel.addProduct(payload)
}


module.exports = {
    addProduct
};