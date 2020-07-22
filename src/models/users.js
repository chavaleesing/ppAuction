const pool = require('./../utils/database');
const logger = require('./../utils/logger')


const findAllUsers = async () => {
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
        throw Error(error);
    }
}

const findUserByUsername = async (username) => {
    try {
        const query = `SELECT * FROM users WHERE username = '${username}'`;
        const res = await pool().query(query);
        console.log(res.rows[0])
        return res.rows[0]  
    } catch (error) {
        return null
    }
}

const findUserByToken = async (token) => {
    try {
        const query = `SELECT * FROM users WHERE id = (SELECT user_id FROM access_token WHERE token = '${token}')`;
        const res = await pool().query(query);
        console.log(res.rows[0])
        return res.rows[0]  
    } catch (error) {
        return null
    }
}

const createToken = async (token, refresh_token, expires, user_id) => {
    try {
        const query = `INSERT INTO access_token (token, refresh_token, expires, status, user_id)
                    VALUES ('${token}', '${refresh_token}', '${expires}', 'ACTIVE', '${user_id}')`;
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
    findAllUsers,
    createUser,
    findUserByUsername,
    findUserByToken,
    createToken,
    removeToken
};