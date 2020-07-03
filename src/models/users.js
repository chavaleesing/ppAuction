const pool = require('./../utils/database');


const getAllUsers = async () => {
    const res = await pool().query('SELECT * from users');
    console.log(res.rows[0])
    //await pool().end()
    return res
}

module.exports = {
    getAllUsers
};