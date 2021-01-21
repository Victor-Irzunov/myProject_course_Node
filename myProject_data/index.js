const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const mainRoutes = require('./routes/main')
const addRoutes = require('./routes/add')
const basketRoutes = require('./routes/basket')
const ordersRoutes = require('./routes/orders')
const xxxRoutes = require('./routes/product')
const User = require('./models/user')

app.engine('hbs', exphbs({
	defaultLayout: 'main',
	extname: 'hbs',
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
	try {
		const user = await User.findById('60089061f79d680a509962fc')
		req.user = user
		next()
	}
	catch (error) {
		console.log('Витя это ошибка error:', error, '------------index.js---')
	}
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/', mainRoutes)
app.use('/add', addRoutes)
app.use('/basket', basketRoutes)
app.use('/orders', ordersRoutes)
app.use('/productsss', xxxRoutes)

const PORT = process.env.PORT || 8000

async function start() {
	try {
		const url = `mongodb+srv://Victor-school:uG73dLnsUETlKVzf@cluster0.6aeiv.mongodb.net/my__session`
		await mongoose.connect(
			url,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			})
		const candidate = await User.findOne()  //чтобы забрать хоть один элем с БД №43
		if (!candidate) {
			const user = new User({                         //если нету создаем нов польз №43  //пока локально создаем №43
				email: 'Irzunow@tut.by',
				name: 'Victor',
				cart: { items: [] }
			})
			await user.save()
		}

		app.listen(PORT, () => console.log(`--- Сервер запущен на порту: ${PORT} ---`))
	}
	catch (e) {
		console.log('Витя это ошибка e: ', e, '---------------index.js-----------')
	}
}
start()




const user = 'Victor-school:uG73dLnsUETlKVzf'
