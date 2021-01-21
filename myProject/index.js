const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const mainRoutes = require('./routes/main')
const addRoutes = require('./routes/add')
const basketRoutes = require('./routes/basket')
const ordersRoutes = require('./routes/orders')
const xxxRoutes = require('./routes/product')




app.engine('hbs', exphbs({
	defaultLayout: 'main',
	extname: 'hbs',
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', mainRoutes)
app.use('/add', addRoutes)
app.use('/basket', basketRoutes)
app.use('/orders', ordersRoutes)
app.use('/productsss', xxxRoutes)






const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`))

