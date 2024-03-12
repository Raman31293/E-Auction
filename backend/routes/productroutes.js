const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

const productDetails = require('../controllers/productcontroller')

router.post('/add',authMiddleware, productDetails.addProduct);
router.get('/details',authMiddleware, productDetails.getProduct);
router.get('/:id',authMiddleware, productDetails.productByIdController);
router.post('/:id/bid',authMiddleware, productDetails.placeBid)
module.exports = router;