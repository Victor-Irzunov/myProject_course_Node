const { Router } = require('express')
const Product = require('../models/products')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth, (req, res) => {                        // auth,  express поймет нас
	res.render('add', {
		title: "Admin",
		isAdd: true
	})
})


router.post('/', auth, async (req, res) => {

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