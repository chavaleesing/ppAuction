const express = require('express');
const router = express.Router();

router.get('/:categoryId', (req, res) => {
    res.json({'status': 'get categoryId OK.'});
})

module.exports = router;