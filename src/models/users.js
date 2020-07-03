const pool = require('./../utils/database');


const getAllUsers = async () => {
    const res = await pool().query('SELECT * from users');
    console.log(res.rows[0])
    return res
}

const createUser = async (payload) => {
    const query = `INSERT INTO users (username, password, email)
                    VALUES ('${payload.username}', '${payload.password}', '${payload.email}')`;
    const res = await pool().query(query);
}

module.exports = {
    getAllUsers,
    createUser
};