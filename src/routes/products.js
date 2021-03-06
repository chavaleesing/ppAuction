const express = require('express');
const router = express.Router();
const productsService = require('./../services/products/products')
const authMiddleware = require('./../middleware/auth')

router.get('/:productId', authMiddleware.tokenValidation, async (req, res) => {
    try {
        const result = await productsService.findProduct(req.params, res.locals.user);
        res.json({'data': result, 'status': 'Find product successful'});
    } catch (error) {
        res.status(400).json({'status': 'failed', 'error': error.message});
    }
})

router.get('/all', authMiddleware.tokenValidation, async (req, res) => {
    try {
        const result = await productsService.findAllProduct(req.params, res.locals.user);
        res.json({'data': result, 'status': 'Get all product successful'});
    } catch (error) {
        res.status(400).json({'status': 'failed', 'error': error.message});
    }
})

router.get('/category_id/:category_id', authMiddleware.tokenValidation, async (req, res) => {
    try {
        const result = await productsService.findProductsByCategoryId(req.params, res.locals.user);
        res.json({'data': result, 'status': 'Find product by category_id successful'});
    } catch (error) {
        res.status(400).json({'status': 'failed', 'error': error.message});
    }
})

router.get('/user_id/:user_id', authMiddleware.tokenValidation, async (req, res) => {
    try {
        const result = await productsService.findProductsByUserId(req.params, res.locals.user);
        res.json({'data': result, 'status': 'Find product by user_id successful'});
    } catch (error) {
        res.status(400).json({'status': 'failed', 'error': error.message});
    }
})

router.post('/add', authMiddleware.tokenValidation, async (req, res) => {
    try {
        const result = await productsService.addProduct(req.body, res.locals.user);
        res.json({'data': result, 'status': 'Add product successful'});
    } catch (error) {
        res.status(400).json({'status': 'Add product failed', 'error': error.message});
    }
})

router.post('/remove', authMiddleware.tokenValidation, async (req, res) => {
    try {
        await productsService.removeProduct(req.body, res.locals.user);
        res.json({'status': 'remove Product successful'});
    } catch (error) {
        res.status(400).json({'status': 'remove Product failed', 'error': error.message});
    }
})

router.post('/update', authMiddleware.tokenValidation, async (req, res) => {
    try {
        const result = await productsService.updateProduct(req.body, res.locals.user);
        res.json({'data': result, 'status': 'update Product successful'});
    } catch (error) {
        res.status(400).json({'status': 'update Product failed', 'error': error.message});
    }
})

module.exports = router;