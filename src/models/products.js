const pool = require('./../utils/database');
const logger = require('./../utils/logger')


const findProduct = async (payload) => {
    try {
        const query = `SELECT * FROM products WHERE id = '${payload.productId}'`;
        const result = await pool().query(query);
        return result.rows[0]
    } catch (error) {
        logger.error(`error ${error}`);
        throw Error(error);
    }
}

const findUserIdByProductIds = async (payload) => {
    try {
        const query = `SELECT DISTINCT user_id FROM products WHERE id = ANY ($1)`;
        const result = await pool().query(query, [payload.id]);
        return result.rows[0]
    } catch (error) {
        logger.error(`error ${error}`);
        throw Error(error);
    }
}

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

const updateProduct = async (payload) => {
    try {
        const query = "UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4"
        await pool().query(query, [payload.name, payload.description, payload.price, payload.id]);
    } catch (error) {
        logger.error(`error ${error}`);
        throw Error(error);
    }
}

module.exports = {
    findProduct,
    findUserIdByProductIds,
    addProduct,
    removeProduct,
    updateProduct
};