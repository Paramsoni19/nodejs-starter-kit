const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
const customResponse = require('../utils/customResponse');

const createProduct = catchAsync(async (req, res) => {
	const response = await productService.createProduct(req.body);
	return customResponse(res, response);
});

const getProducts = catchAsync(async (req, res) => {
	const filter = pick(req.query, ['name', 'role']);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const response = await productService.queryProducts(filter, options);
	return customResponse(res, response);
});

const getProduct = catchAsync(async (req, res) => {
	const response = await productService.getProductById(req.params.productId);
	return customResponse(res, response);
});

const updateProduct = catchAsync(async (req, res) => {
	const response = await productService.updateProductById(req.params.productId, req.body);
	return customResponse(res, response);
});

const deleteProduct = catchAsync(async (req, res) => {
	const response = await productService.deleteProductById(req.params.productId);
	return customResponse(res, response);
});

module.exports = {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
};
