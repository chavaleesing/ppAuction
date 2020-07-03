const express = require('express');
const router = express.Router();

router.get('/:userId', (req, res) => {
    res.json({'status': 'get userId OK.'});
})

module.exports = router;