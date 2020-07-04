const express = require('express');
const router = express.Router();
const auth = require('./../services/users/auth')

router.get('/all', async (req, res) => {
    const all = await auth.getAllUsers();
    res.json({'status': 'get userId OK.', 'data': all});
})

router.post('/register', async (req, res) => {
    await auth.createUser(req.body);
    res.json({'status': 'Create user successful'});
})

router.post('/login', async (req, res) => {
    username = await auth.login(req.body);
    if (username){
        res.json({'status': 'Login successful'});
    } else {
        res.json({'status': 'Login failed'});
    }
})

module.exports = router;