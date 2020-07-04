const pool = require('./../utils/database');
const logger = require('./../utils/logger')


const getAllUsers = async () => {
    try {
        const res = await pool().query('SELECT * from users');
        console.log(res.rows[0])
        return res.rows
    } catch (error) {
        return null
    }
}

const createUser = async (payload) => {
    try {
        const query = `INSERT INTO users (username, password, email)
                    VALUES ('${payload.username}', '${payload.password}', '${payload.email}')`;
        await pool().query(query);
    } catch (error) {
        logger.error(`error ${error}`);
    }
}

const getUserByUsername = async (username) => {
    try {
        const query = `SELECT * from users WHERE username = '${username}'`;
        const res = await pool().query(query);
        console.log(res.rows[0])
        return res.rows[0]  
    } catch (error) {
        return null
    }
}

const createToken = async (token, expires, user_id) => {
    try {
        const query = `INSERT INTO access_token (token, refresh_token, expires, status, user_id)
                    VALUES ('${token}', '${token}', '${expires}', 'ACTIVE', '${user_id}')`;
        await pool().query(query);
    } catch (error) {
        logger.error(`error ${error}`);
    }
}

const removeToken = async (token) => {
    try {
        const query = `DELETE FROM access_token WHERE token = '${token}'`
        await pool().query(query);
    } catch (error) {
        logger.error(`error ${error}`);
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUserByUsername,
    createToken,
    removeToken
};