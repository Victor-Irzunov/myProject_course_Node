const { Router } = require('express')
const Order = require('../models/order')
const router = Router()

router.get('/', async (req, res) => {
	try {
		//получ список всех проду ко торое относять к id польз
		const orders_1 = await Order.find({
			'user.userId': req.user._id
			//если совпадают то это все заказы     //! 'user.userId'  в моделе order // req.user._id текущий id
		}).populate('user.userId')
		console.log('orders_1:', orders_1, '-----------------------------orders')
		//// console.log('req.user', req.user, '---------------------orders')
		res.render('orders', {
			title: "Заказы",
			isOrder: true,
			orders: orders_1.map(o => {
				return {
					...o._doc,
					price: o.product_order.reduce((total, c) => {
						//считаем цену всего закза
						return total += c.co_un_t * c.pro_du_ct.price
					}, 0)
				}

			})
		})

	}
	catch (err) {
		console.log('Витя здесь ошибка err:', err, '----------orders')
	}

})

router.post('/', async (req, res) => {
	try {
		const user = await req.user.populate('cart.items.productId').execPopulate()   //.populate('card.items.poductId') id продукта мы превращаем в обькты

		const product_10 = user.cart.items.map(i => ({
			co_un_t: i.count,
			pro_du_ct: { ...i.productId._doc },
		}))                                         //получ читаемый формат

		const order = new Order({
			user: {
				name: req.user.name,
				userId: req.user
			},
			product_order: product_10
		})

		await order.save()
		await req.user.clearCart()

		res.redirect('/orders')
	}
	catch (e) {
		console.log('Витя здесь ошибка e: ', e, '-------------------orders')
	}

})

module.exports = router