const express = require('express');
const router = express.Router();
const authService = require('./../services/users/auth')

router.get('/all', async (req, res) => {
    const all = await authService.getAllUsers();
    res.json({'status': 'get userId OK.', 'data': all});
})

router.post('/register', async (req, res) => {
    try {
        await authService.createUser(req.body);
        res.json({'status': 'Create user successful'});
    } catch (error) {
        res.status(400).json({'status': 'Create user failed', 'error': error.message});
    }
})

router.post('/login', async (req, res) => {
    try {
        const token = await authService.login(req.body);
        res.json({'status': 'Login successful', 'token': token});
    } catch (error) {
        res.status(400).json({'status': 'Login failed', 'error': error.message});
    }
})

router.post('/logout', async (req, res) => {
    try {
        await authService.logout(req.headers);
        res.json({'status': 'Logout successful'});
    } catch (error) {
        res.status(400).json({'status': 'Logout failed', 'error': error.message});
    }
})

module.exports = router;