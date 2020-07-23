const pool = require('./../utils/database');
const logger = require('./../utils/logger')


const addProduct = async (payload) => {
    try {
        const query = `INSERT INTO products (name, description, price, user_id)
                    VALUES ('${payload.name}', '${payload.description}', '${payload.price}', '${payload.user_id}')`;
        await pool().query(query);
    } catch (error) {
        logger.error(`error ${error}`);
        throw Error(error);
    }
}

const removeProduct = async (payload) => {
    try {
        const query = "DELETE FROM products WHERE id = ANY ($1)"
        await pool().query(query, [payload.id]);
    } catch (error) {
        logger.error(`error ${error}`);
        throw Error(error);
    }
}


module.exports = {
    addProduct,
    removeProduct
};