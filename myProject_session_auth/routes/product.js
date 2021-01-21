const { Router } = require('express')
const Products = require('../models/products')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', async (req, res) => {
	const products = await Products.find()
	res.render('productsss', {
		title: "#2",
		isXxx: true,
		products
	})
})

//редактируем
router.get('/:id/edit', auth, async (req, res) => {
	if (!req.query.allow) {
		return res.redirect('/')
	}
	const prod = await Products.findById(req.params.id)
	res.render('product-edit', {
		title: `Редактировать ${prod.title}`,
		prod
	})
})

router.post('/edit', auth, async (req, res) => {
	const { id } = req.body
	delete req.body.id
	await Products.findByIdAndUpdate(id, req.body)
	res.redirect('/')
})

router.post('/remove', auth, async (req, res) => {
	try {
		await Products.deleteOne({ _id: req.body.id })
		res.redirect('/')
	}
	catch (error) {
		console.log('Витя это error: ', error, '----------product.js-----------')
	}
})

router.get('/:id', async (req, res) => {
	try {
		const product = await Products.findById(req.params.id)
		//// console.log('Витя это const product: ', product, '-------------product.js --------"просмотреть"')
		res.render('productsss', {
			title: `Продукт ${product.title}`,
			layouts: "empty",
			product
		})
	}
	catch (err) {
		console.log('Витя это err: ', err, '----------product.js-----------')
	}
})



module.exports = router