const express = require('express');
const router = express.Router();
const auth = require('./../services/users/auth')

router.get('/all', async (req, res) => {
    const all = await auth.getAllUsers();
    res.json({'status': 'get userId OK.', 'data': all});
})

router.post('/register', async (req, res) => {
    try {
        await auth.createUser(req.body);
        res.json({'status': 'Create user successful'});
    } catch (error) {
        res.status(400).json({'status': 'Create user failed', 'error': error.message});
    }
})

router.post('/login', async (req, res) => {
    try {
        username = await auth.login(req.body);
        res.json({'status': 'Login successful'});
    } catch (error) {
        res.status(400).json({'status': 'Login failed', 'error': error.message});
    }
})

router.post('/logout', async (req, res) => {
    try {
        await auth.logout(req.headers);
        res.json({'status': 'Logout successful'});
    } catch (error) {
        res.status(400).json({'status': 'Logout failed', 'error': error.message});
    }
})

module.exports = router;