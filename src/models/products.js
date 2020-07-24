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

const findAllProducts = async (payload) => {
    try {
        const query = `SELECT * FROM products`;
        const result = await pool().query(query);
        return result.rows
    } catch (error) {
        logger.error(`error ${error}`);
        throw Error(error);
    }
}

const findUserIdByProductIds = async (payload) => {
    try {
        let query;
        if(Array.isArray(payload.id)){
            query = `SELECT DISTINCT user_id FROM products WHERE id = ANY ($1)`;
        } else {
            query = `SELECT DISTINCT user_id FROM products WHERE id = $1`;
        }
        const result = await pool().query(query, [payload.id]);
        return result.rows[0];
    } catch (error) {
        logger.error(`error ${error}`);
        throw Error(error);
    }
}

const findProductsByCategoryId = async (payload) => {
    try {
        const query = `select * from products where id in 
        (select product_id from products_categories where category_id = '${payload.category_id}')`
        const result = await pool().query(query);
        return result.rows;
    } catch (error) {
        logger.error(`error ${error}`);
        throw Error(error);
    }
}

const findProductsByUserId = async (payload) => {
    try {
        const query = `select * from products where user_id = '${payload.user_id}'`
        const result = await pool().query(query);
        return result.rows;
    } catch (error) {
        logger.error(`error ${error}`);
        throw Error(error);
    }
}

const addProduct = async (payload) => {
    try {
        const query = `INSERT INTO products (name, description, price, user_id)
                    VALUES ('${payload.name}', '${payload.description}', '${payload.price}', '${payload.user_id}') RETURNING *`;
        const result = await pool().query(query);
        return result.rows[0];
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
        const query = "UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *";
        const result = await pool().query(query, [payload.name, payload.description, payload.price, payload.id]);
        return result.rows[0];
    } catch (error) {
        logger.error(`error ${error}`);
        throw Error(error);
    }
}

const addProductCategory = async (payload) => {
    try {
        const query = `INSERT INTO products_categories (product_id, category_id)
                    VALUES ('${payload.product_id}', '${payload.category_id}') RETURNING *`;
        const result = await pool().query(query);
        return result.rows[0];
    } catch (error) {
        logger.error(`error ${error}`);
        throw Error(error);
    }
}



module.exports = {
    findProduct,
    findAllProducts,
    findUserIdByProductIds,
    findProductsByCategoryId,
    findProductsByUserId,
    addProduct,
    removeProduct,
    updateProduct,
    addProductCategory
};