const { Router } = require('express')
const Products = require('../models/products')
const router = Router()

router.get('/', async (req, res) => {
	const products = await Products.getAll()
	res.render('productsss', {
		title: "#2",
		isXxx: true,
		products
	})
})

router.get('/:id/edit', async (req, res) => {
	if (!req.query.allow) {
		return res.redirect('/')
	}
	const prod = await Products.getById(req.params.id)
	res.render('product-edit', {
		title: `Редактировать ${prod.title}`,
		prod
	})
})


router.post('/edit', async (req, res) => {
	await Products.update(req.body)
	res.redirect('/')
})


router.get('/:id', async (req, res) => {
	try {
		const product = await Products.getById(req.params.id)
		console.log('const product: ', product, '-------------product.js --------sring 35')

		res.render('productsss', {
			title: `Продукт ${product.title}`,
			layouts: "empty",
			product
		})
	}
	catch (err) {
		console.log(err, '---err------------27 27 27 string')
	}
})



module.exports = router