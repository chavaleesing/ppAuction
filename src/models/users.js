const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
})


const getUser = async () => {
    await client.connect();
    const res = await client.query('SELECT * from users');
    console.log(res.rows[0]) // Hello world!
    await client.end()
    return res
}

module.exports = {getUser};