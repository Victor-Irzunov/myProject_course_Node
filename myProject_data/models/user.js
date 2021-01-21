
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	cart: {                               //у каждого польз есть карта с сылкой на courseId для связки БД  #43 Добавление пользователя  
		items: [
			{
				count: {
					type: Number,
					required: true,
					default: 1
				},
				total: {
					type: Number,
					required: true
				},
				productId: {
					type: Schema.Types.ObjectId,               //mongoose будет проверять на тот формат с которым он работает  №42 - Модель пользователя
					ref: 'Product',                                //должна совпадать с product.js module.exports = model('Course', course)   №42 - Модель пользователя
					required: true
				}
			}
		]
	}
})
userSchema.methods.addToCart = function (product) {             //function важно тк this
//// console.log('this>>>', this)
	const items = [...this.cart.items]                     //либо const items = this.cart.items.concat()
	//// console.log('items:->->->->->::', items, '------------------user')
	const idx = items.findIndex(c => {
		return c.productId.toString() === product._id.toString()                              //если задаем Types.ObjectId то обязательно .toString()
	})

	if (idx >= 0) {
		items[idx].count = items[idx].count + 1
		items[idx].total = product.price * items[idx].count
	}
	else {
		items.push({
			productId: product._id,
			count: 1,
			total: product.price
		})
	}
	this.cart = { items: items }
	return this.save()
}



userSchema.methods.removeFromCart = function (id) {
	// console.log('id', id)
	let items = [...this.cart.items]
	const idx = items.findIndex(c => c.productId.toString() === id.toString())

	if (items[idx].count === 1) {
		items = items.filter(c => c.productId.toString() !== id.toString())
	}
	else {
		let d = items[idx].total / items[idx].count
		// console.log(d)
		items[idx].count--
		items[idx].total = items[idx].total - d
	}

	this.cart = { items }
	return this.save()
}

userSchema.methods.clearCart = function () {
	this.cart = { items: [] }
	return this.save()

}

module.exports = model('User', userSchema)       //регистрируем новою модель юсер с схемой userSchema  №42 - Модель пользователя










