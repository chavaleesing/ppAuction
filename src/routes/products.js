const express = require('express');
const router = express.Router();
const productsService = require('./../services/products/products')
const authMiddleware = require('./../middleware/auth')

router.get('/:productId', authMiddleware.tokenValidation, (req, res) => {
    res.json({'status': 'get productId OK.'});
})

router.get('/all', authMiddleware.tokenValidation, (req, res) => {
    res.json({'status': 'get all productId OK.'});
})

router.post('/add', authMiddleware.tokenValidation, async (req, res) => {
    try {
        await productsService.addProduct(req.body, res.locals.user);
        res.json({'status': 'Add product successful'});
    } catch (error) {
        res.status(400).json({'status': 'Add product failed', 'error': error.message});
    }
})

router.post('/remove', authMiddleware.tokenValidation, async (req, res) => {
    try {
        await productsService.addProduct(req.body);
        res.json({'status': 'Add product successful'});
    } catch (error) {
        res.status(400).json({'status': 'Add product failed', 'error': error.message});
    }
})

module.exports = router;