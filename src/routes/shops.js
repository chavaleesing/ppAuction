const express = require('express');
const router = express.Router();

router.get('/:shopId', (req, res) => {
    res.json({'status': 'get shopId OK.'});
})

module.exports = router;