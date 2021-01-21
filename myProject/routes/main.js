const { Router } = require('express')
const Products = require('../models/products')
const router = Router()

router.get('/', async (req, res) => {
const products = await Products.getAll()
	res.render('index', {
		title: "Главная #1",
		isHome: true,
		products
	})
})




module.exports = router