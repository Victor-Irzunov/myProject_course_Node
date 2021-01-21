const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)  //(session) передаем пакет который будем испл для синхрониз с БД  №54 - Сессия в базе данных
const MONGODB_URI = `mongodb+srv://Victor-school:uG73dLnsUETlKVzf@cluster0.6aeiv.mongodb.net/my__session`
const app = express()
const path = require('path')
const csrf = require('csurf')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const mainRoutes = require('./routes/main')
const addRoutes = require('./routes/add')
const basketRoutes = require('./routes/basket')
const ordersRoutes = require('./routes/orders')
const xxxRoutes = require('./routes/product')
const authRoutes = require('./routes/auth')
const userMiddleware = require('./middleware/user')
const varMiddleware = require('./middleware/variables')

const store = new MongoStore({
	collection: 'sessions_s',
	uri: MONGODB_URI
})

app.engine('hbs', exphbs({
	defaultLayout: 'main',
	extname: 'hbs',
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
	secret: 'some secret value',
	resave: false,
	saveUninitialized: false,
	store: store
}))
app.use(csrf())
app.use(flash())
app.use(userMiddleware)
app.use(varMiddleware)
app.use('/', mainRoutes)
app.use('/add', addRoutes)
app.use('/basket', basketRoutes)
app.use('/orders', ordersRoutes)
app.use('/productsss', xxxRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 8000

async function start() {
	try {
		await mongoose.connect(
			MONGODB_URI,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			})

		app.listen(PORT, () => console.log(`--- Сервер запущен на порту: ${PORT} ---`))
	}
	catch (e) {
		console.log('Витя это ошибка e: ', e, '---------------index.js-----------')
	}
}
start()




const user = 'Victor-school:uG73dLnsUETlKVzf'
