const pool = require('./../utils/database');


const getAllUsers = async () => {
    const res = await pool().query('SELECT * from users');
    console.log(res.rows[0])
    return res.rows
}

const createUser = async (payload) => {
    const query = `INSERT INTO users (username, password, email)
                    VALUES ('${payload.username}', '${payload.password}', '${payload.email}')`;
    const res = await pool().query(query);
}

const getUserByUsername = async (username) => {
    const query = `SELECT * from users WHERE username = '${username}'`;
    const res = await pool().query(query);
    console.log(res.rows[0])
    return res.rows[0]
}

const createToken = async (token, expires, user_id) => {
    const query = `INSERT INTO access_token (token, refresh_token, expires, status, user_id)
                    VALUES ('${token}', '${token}', '${expires}', 'ACTIVE', '${user_id}')`;
    await pool().query(query);
}

module.exports = {
    getAllUsers,
    createUser,
    getUserByUsername,
    createToken
};