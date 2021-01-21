const { modelNames } = require('mongoose')
const { Schema, model } = require('mongoose')

const product_schema = new Schema({
	title: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		require: true
	},
	img: String,
	userId: {
		type: Schema.Types.ObjectId,               //mongoose будет проверять на тот формат с которым он работает  №42 - Модель пользователя
		ref: 'User'
	}
})

product_schema.method('toClient', function () {
	const product = this.toObject()
	product.id = product._id
	delete product._id
	//// console.log('product:', product, '---------------------products')

	return product
})

module.exports = model('Product', product_schema)