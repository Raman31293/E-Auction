const express = require('express');
const router = express.Router();

const productDetails = require('../controllers/productcontroller')

router.post('/add', productDetails.addProduct);
router.get('/details', productDetails.getProduct);
router.get('/:id', productDetails.productByIdController);
router.post('/:id/bid',productDetails.placeBid)
module.exports = router;