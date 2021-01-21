const { Router } = require('express')
const Basket = require('../models/basket')
const Product = require('../models/products')
const router = Router()


router.post('/add', async (req, res) => {
	// console.log('req.body.id:', req.body.id, '------это----req.body.id')
	const idProd = await Product.getById(req.body.id)
	// console.log('const idProd: ', idProd, '-----------const idProd----------routes basket.js 8 string------------')

	await Basket.add(idProd)

	res.redirect('/basket')
})



//----------------------------------------------------
router.post('/addidas/:id', async (req, res) => {

	const i = await Product.getById(req.params.id)
	// console.log('i', i,'-------------i-------')
	const car_d = await Basket.add(i)

// console.log('Начало - const car_d: ', car_d, '-Ура!!!!!!!!!!------конец-const car_d------')
	res.status(201).json(car_d)
	
})
//------------------------------------------------------


router.delete('/remove/:id', async (req, res) => {
	const card = await Basket.remove(req.params.id)
	// console.log('const card: ', card, '----------const card--------routes  basket.js ----string 20')

	res.status(200).json(card)
})





router.get('/', async (req, res) => {
	const basket = await Basket.fetch()
	console.log('const basket: ', basket, '------------routes-basket js  string 28--------')

	res.render('basket', {
		isBasket: true,
		title: 'Корзина',
		products1: basket.productss1,
		price1: basket.price,
		total: basket.total,
	})
})

module.exports = router