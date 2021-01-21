// №51 - Страница логина
const { Router } = require('express')
const router = Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')


router.get('/login', async (req, res) => {
	res.render('auth/login', {                                      //'auth/login' -папка и файл 	
		title: 'Авторизация',
		isLogin: true,
		loginError: req.flash('loginError'),                  //№61 - Сообщения об ошибке
		registerError: req.flash('registerError')             //№61 - Сообщения об ошибке
	})
})


//+++ ВЫЙТИ:
//№52 - Добавление сессии           
router.get('/logout', async (req, res) => {
	//очистить сесию 2 варианта
	// req.session.isAuthenticated = false
	//и более элегант метод
	req.session.destroy(() => {                       //.destroy(    очищать данные из БД //callback буде вызван когда будут уничтож все сессии
		res.redirect('/auth/login#login')
	})
})


router.post('/login', async (req, res) => {
	try {                                          //№58 - Логин пользователя
		const { email, password } = req.body
		//когда мы делаем логи необх провер сущ такой польз или нет , если нет то это оибка и мы не можем войти в систем  //№58 - Логин пользователя
		const candidate = await User.findOne({ email })

		if (candidate) {
			//// console.log('candidate: ', candidate, '----------------auth rout')
			//если польз сущ необх провер пороли на совпадение  //№58 - Логин пользователя
			// const areSame = password === candidate.password         //изменил на ниже                 №59 - Шифрование пароля 
			const areSame = await bcrypt.compare(password, candidate.password)              //№59 - Шифрование пароля   //.compare - сравнвает

			if (areSame) {

				req.session.user = candidate                       //№58 - Логин пользователя
				req.session.isAuthenticated = true           //своя перем isAuthenticated
				req.session.save(err => {                    //в пакете express-session есть функионал (чтобы  редирект не раньше сесии)
					if (err) {
						throw err
					}
					else if (candidate.id === "600960ef7095401838974df2") {
						req.session.isAdmin = true
						res.redirect('/')
					}
					else {
						res.redirect('/')
					}
				})
			}
			else {
				req.flash('loginError', 'Неверный пароль, пожалуйста попробуйте ещё')                   //№61 - Сообщения об ошибке
				res.redirect('/auth/login#login')
			}
		}
		else {
			req.flash('loginError', 'Извините, но пользователя с таким email в нашем приложении не существует')                      //№61 - Сообщения об ошибке
			res.redirect('/auth/login#login')
		}
	}
	catch (e) {
		console.log('Витя это ошибка e: ', e, '^^^^^^^^^^^^auth.js router^^^^^^^^^^люблю ошибки^^^^')
	}
})


// №57 - Регистрация пользователя                                  //реализ регистрац чтобы создовать новых пользователей
router.post('/register', async (req, res) => {
	try {
		const { email, password, repeat, name } = req.body          //создаем нового польз на основе тех данных которые мы передаем из формы    //№57 - Регистрация пользователя

		//проверяем существует такой польз если сущест то ошобка    //№57 - Регистрация пользователя
		const candidate = await User.findOne({ email })                         //.findOne тк один польз может быть найден
		if (candidate) {
			//если имеил такой есть сообщить польз что имеил уже занят     //№61 - Сообщения об ошибке
			req.flash('registerError', 'Извините, но пользователь с таким email уже существует')       //№61 - Сообщения об ошибке

			res.redirect('/auth/login#register')
		}
		else {                                                         //если польз нету то делаем регистрацию   //№57 - Регистрация пользователя
			const hashPassword = await bcrypt.hash(password, 10)                  //№59 - Шифрование пароля  //.hash( возвращает промис он асинхроный  // 10) сильнее шифрование
			const user = new User({															//новый класс 
				email, name, password: hashPassword, cart: { items: [] }                //тк клч и значение совподают то оставл так   //№57 - Регистрация пользователя  //: hashPassword  №59 - Шифрование пароля
			})
			await user.save()                                               //ждем когда пользователь сохраниться   //№57 - Регистрация пользователя
			res.redirect('/auth/login#login')                               //когда польз уже создан   //№57 - Регистрация пользователя
		}
	}
	catch (e) {
		console.log('Витя это ошибка e: ', e, '````````````auth.js router`````люблю ошибки``````')
	}
})

module.exports = router