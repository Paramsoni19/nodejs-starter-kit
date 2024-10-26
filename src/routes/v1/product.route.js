const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');
const { productController } = require('../../controllers');

const router = express.Router();

router
	.route('/')
	.post(productController.createProduct)
	.get(productController.getProducts);

router
	.route('/:productId')
	.get(productController.getProduct)
	.patch(productController.updateProduct)
	.delete(productController.deleteProduct);

module.exports = router;
