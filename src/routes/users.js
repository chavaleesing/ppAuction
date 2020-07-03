const express = require('express');
const router = express.Router();
const auth = require('./../services/users/auth')

router.get('/all', async (req, res) => {
    const all = await auth.getAllUsers();
    res.json({'status': 'get userId OK.', 'data': all});
})

router.post('/register', async (req, res) => {
    const all = await auth.createUser(req.body);
    res.json({'status': 'Create user successful'});
})

module.exports = router;