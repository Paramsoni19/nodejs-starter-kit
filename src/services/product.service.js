
const { CREATED, SUCCESS, NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('../utils/responseManager');

const createProduct = async (productBody) => {
	const { name, description, price, quantity } = productBody;

    const newProduct = await pool.query(
      "INSERT INTO todo (name, description, price, quantity) VALUES($1, $2, $3, $4) RETURNING *",
      [name, description, price, quantity]
    );


	return {
		code: CREATED.code,
		message: 'Product created',
		data: newProduct,
	};
};

const queryProducts = async (filter, options) => {
	const products = await Product.paginate(filter, options);

	if (!products.results.length) {
		return {
			message: 'Products not found',
			code: NOT_FOUND.code,
		};
	}

	return {
		code: SUCCESS.code,
		message: 'Products retrieved',
		data: products,
	};
};

const getProductById = async (id) => {
	const product = await Product.findById(id);

	if (!product) {
		return {
			code: NOT_FOUND.code,
			message: 'Product not found',
		};
	}

	return {
		code: SUCCESS.code,
		message: 'Product retrieved',
		data: product,
	};
};

const getProductByEmail = async (email) => {
	const product = await Product.findOne({ email });

	if (!product) {
		return {
			code: NOT_FOUND.code,
			message: 'Product not found',
		};
	}

	return {
		code: SUCCESS.code,
		message: 'Product retrieved',
		data: product,
	};
};

const updateProductById = async (productId, updateBody) => {
	const product = await Product.findById(productId);

	if (!product) {
		return {
			code: NOT_FOUND.code,
			message: 'Product not found',
		};
	}

	if (updateBody.email && (await Product.isEmailTaken(updateBody.email, productId))) {
		return {
			code: BAD_REQUEST.code,
			message: 'Email already taken',
		};
	}

	Object.assign(product, updateBody);

	await product.save();

	return {
		code: SUCCESS.code,
		message: 'Product updated',
		data: product,
	};
};

const deleteProductById = async (productId) => {
	const product = await Product.findById(productId);

	if (!product) {
		return {
			code: NOT_FOUND.code,
			message: 'Product not found',
		};
	}

	await product.remove();

	return {
		code: SUCCESS.code,
		message: 'Product deleted',
		data: product,
	};
};

module.exports = {
	createProduct,
	queryProducts,
	getProductById,
	getProductByEmail,
	updateProductById,
	deleteProductById,
};
