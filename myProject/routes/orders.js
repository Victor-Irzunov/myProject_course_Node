const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => {
	res.render('orders', {
		title: "Заказы",
		isOrder: true
	})
})

module.exports = router