const { Router } = require('express')
const Products = require('../models/products')
const router = Router()

router.get('/', async (req, res) => {
	const products = await Products.find().populate('userId', 'email name').select('price title img')
	if (req.session.isAdmin) {
		res.render('index', {
			title: "Admin",
			isHome: true,
			products
		})
	}
	else {
		res.render('index', {
			title: "Главная #1",
			isHome: true,
			products
		})
	}	
})




module.exports = router