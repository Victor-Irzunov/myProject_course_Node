// №55 - Защита роутов   //в url /index/add 
module.exports = function (req, res, next) {

	//проверяем авторизацию
	if (!req.session.isAuthenticated) {
		console.log('Витя - вошел не авторизованный >>>>>>>>>>>>>>>>>>>>>>>> auth.js middleware')
		
		return res.redirect('/auth/login')             //если не зареген то перенаправл на страницу логина //return прекратить
	}
	next()
}