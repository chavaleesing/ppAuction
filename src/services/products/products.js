const logger = require('../../utils/logger');
const productsModel = require('../../models/products');


const findProduct = async (payload, user) => {
    logger.info('find Product ja');
    const result = await productsModel.findProduct(payload)
    return result
}

const findAllProducts = async (payload, user) => {
    const result = await productsModel.findAllProduct(payload)
    return result
}

const findProductsByCategoryId = async (payload, user) => {
    const result = await productsModel.findProductsByCategoryId(payload)
    return result
}

const findProductsByUserId = async (payload, user) => {
    const result = await productsModel.findProductsByUserId(payload)
    return result
}

const addProduct = async (payload, user) => {
    logger.info('addProduct ja');
    payload.user_id = user.userId
    const result = await productsModel.addProduct(payload)
    if(payload.category_id){
        payload.product_id = result.id
        await productsModel.addProductCategory(payload)
        result.category_id = payload.category_id
    }
    return result
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
    return await productsModel.updateProduct(payload)
}

module.exports = {
    findProduct,
    findAllProducts,
    findProductsByCategoryId,
    findProductsByUserId,
    addProduct,
    removeProduct,
    updateProduct
};