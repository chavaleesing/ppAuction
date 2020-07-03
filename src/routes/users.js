const express = require('express');
const router = express.Router();
const findUser = require('./../services/users/auth')

router.get('/:userId', async (req, res) => {
    const aa = await findUser();
    res.json({'status': 'get userId OK.', 'data': aa});
})

module.exports = router;