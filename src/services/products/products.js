const logger = require('../../utils/logger');
const productsModel = require('../../models/products');


const addProduct = async (payload, user) => {
    logger.info('addProduct ja');
    payload.user_id = user.userId
    await productsModel.addProduct(payload)
}

const removeProduct = async (payload, user) => {
    logger.info('removeProduct ja');

    payload.user_id = user.userId
    await productsModel.removeProduct(payload)
}


module.exports = {
    addProduct,
    removeProduct
};