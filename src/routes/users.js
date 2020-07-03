const express = require('express');
const router = express.Router();
const getAllUsers = require('./../services/users/auth')

router.get('/all', async (req, res) => {
    const all = await getAllUsers();
    res.json({'status': 'get userId OK.', 'data': all});
})

router.post('/register', async (req, res) => {
    res.json({'status': 'Create user successful'});
})

module.exports = router;