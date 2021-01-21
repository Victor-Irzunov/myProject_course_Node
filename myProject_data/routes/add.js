const { Router } = require('express')
const Product = require('../models/products')
const router = Router()

router.get('/', (req, res) => {
	res.render('add', {
		title: "Admin",
		isAdd: true
	})
})


router.post('/', async (req, res) => {

	const productt = new Product({
		title: req.body.title,
		price: req.body.price,
		img: req.body.img,
		userId: req.user              //mongoos сохранит id за нас №43 - Добавление пользователя
	})
	try {
		await productt.save()
		res.redirect('/')
	}
	catch (err) {
		console.log('err: ', err, '-------------------add.js')
	}


})
module.exports = router