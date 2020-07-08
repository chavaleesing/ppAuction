const express = require('express');
const router = express.Router();

router.get('/:productId', (req, res) => {
    res.json({'status': 'get productId OK.'});
})

router.get('/all', (req, res) => {
    res.json({'status': 'get all productId OK.'});
})

module.exports = router;