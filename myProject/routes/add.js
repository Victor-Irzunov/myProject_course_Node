const { Router } = require('express')
const Products = require('../models/products')
const router = Router()

router.get('/', (req, res) => {
	res.render('add', {
		title: "Admin",
		isAdd: true
	})
})


router.post('/', async (req, res) => {
	console.log(req.body)
	const productt = new Products(req.body.title, req.body.price, req.body.img)


   await productt.save()

	res.redirect('/')
})
module.exports = router