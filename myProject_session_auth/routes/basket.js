const { Router } = require('express')
const Product = require('../models/products')
const auth = require('../middleware/auth')
const router = Router()


function mapBasket(cart) {
	//// console.log('cart::::', cart, '------------------basket')
	const t = cart.items.map(c => ({                //обернул фигур скобки в круглые и это уже обьект
		...c.productId._doc,
		id: c.productId.id,
		count: c.count,
		total: c.total
	}))
	//// console.log('t:', t, '---------------------basket')
	return t
}

//++ общая цена:
function computePrice(p) {
	return p.reduce((total, product) => {
		return total += product.price * product.count
	}, 0)
}

//++ добавление:
router.post('/add', auth, async (req, res) => {
	// console.log('req.body.id:', req.body.id, '------это----req.body.id')
	const idProd = await Product.findById(req.body.id)
	// console.log('const idProd: ', idProd, '-----------const idProd----------routes basket.js 8 string------------')
	// console.log('req.user:', req.user, '----------------basket')
	await req.user.addToCart(idProd)

	res.redirect('/basket')
})



//++ увеличение кол-ва:
router.post('/addidas/:id', auth, async (req, res) => {
	const i = await Product.findById(req.params.id)
	//// console.log('i', i, '-------------i-------')
	await req.user.addToCart(i)
	const user = await req.user.populate('cart.items.productId').execPopulate()
	//// console.log('user:::: ', user, '-----------------bas')
	const productsHi = mapBasket(user.cart)
	//// console.log('productsHi:', productsHi, '-------------------------bas')
	const cart = {
		productsHi, price: computePrice(productsHi)
	}
	//// console.log('Витя это const r: ', , '-Ура!!!!!!!!!!------конец-const r')
	res.status(200).json(cart)
})


//++ уменьшение кол-ва:
router.delete('/remove/:id', auth, async (req, res) => {
	await req.user.removeFromCart(req.params.id)
	const user = await req.user.populate('cart.items.productId').execPopulate()
	//// console.log('user:::: ', user, '-----------------bas')
	const productsHi = mapBasket(user.cart)
	//// console.log('productsHi:', productsHi, '-------------------------bas')
	const cart = {
		productsHi, price: computePrice(productsHi)
	}
	//// console.log('cart=>:', cart, '-----------bas')
	res.status(200).json(cart)
})


//++ удаление:
router.delete('/del/:id', auth, async (req, res) => {
	await req.user.delFromCart(req.params.id)
	const user = await req.user.populate('cart.items.productId').execPopulate()
	//// console.log('user:::: ', user, '-----------------bas')
	const productsHi = mapBasket(user.cart)
	//// console.log('productsHi:', productsHi, '-------------------------bas')
	const cart = {
		productsHi, price: computePrice(productsHi)
	}
	//// console.log('cart=>:', cart, '-----------bas')
	res.status(200).json(cart)
})


//++ заходим на страницу:
router.get('/', auth, async (req, res) => {
	//// console.log('Витя это req.user:=>=>', req.user, '------------------basket.js')
	const user = await req.user
		.populate('cart.items.productId')
		.execPopulate()
	//// console.log('Витя это user.cart:', user.cart, '-------------basket.js')
	const products_map = mapBasket(user.cart)
	//// console.log('Витя это products_map', products_map, '-----------')
	res.render('basket', {
		isBasket: true,
		title: 'Корзина',
		products1: products_map,
		price1: computePrice(products_map)
	})

	// res.json({test: true})              //!test вывод на страницу

})

module.exports = router