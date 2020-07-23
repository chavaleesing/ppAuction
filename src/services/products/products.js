const logger = require('../../utils/logger');
const productsModel = require('../../models/products');


const findProduct = async (payload, user) => {
    logger.info('find Product ja');
    const result = await productsModel.findProduct(payload)
    return result
}

const addProduct = async (payload, user) => {
    logger.info('addProduct ja');
    payload.user_id = user.userId
    await productsModel.addProduct(payload)
}

const removeProduct = async (payload, user) => {
    logger.info('removeProduct ja');
    user_product = await productsModel.findUserIdByProductIds(payload)
    if(user_product.user_id !== user.userId){
        throw Error("You not allow to remove this selected product(s)");
    }
    payload.user_id = user.userId
    await productsModel.removeProduct(payload)
}

const updateProduct = async (payload, user) => {
    logger.info('updateProduct ja');
    user_product = await productsModel.findUserIdByProductIds(payload)
    if(user_product.user_id !== user.userId){
        throw Error("You not allow to update this selected product");
    }
    payload.user_id = user.userId
    await productsModel.updateProduct(payload)
}

module.exports = {
    findProduct,
    addProduct,
    removeProduct,
    updateProduct
};