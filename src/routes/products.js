const express = require('express');
const router = express.Router();

router.get('/:productId', (req, res) => {
    res.json({'status': 'get productId OK.'});
})

module.exports = router;