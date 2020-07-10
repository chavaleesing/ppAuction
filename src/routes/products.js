const express = require('express');
const router = express.Router();
const productsService = require('./../services/products/products')

router.get('/:productId', (req, res) => {
    res.json({'status': 'get productId OK.'});
})

router.get('/all', (req, res) => {
    res.json({'status': 'get all productId OK.'});
})

router.post('/add', async (req, res) => {
    try {
        await productsService.addProduct(req.body);
        res.json({'status': 'Add product successful'});
    } catch (error) {
        res.status(400).json({'status': 'Add product failed', 'error': error.message});
    }
})

module.exports = router;