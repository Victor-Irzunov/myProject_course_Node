const path = require('path')
const fs = require('fs')

const aP = path.join(
	path.dirname(process.mainModule.filename,),
	'data',
	'basket.json'
)
// console.log(aP)  //D:\Programming\Libery_NODE.js\myProject\data\basket.json


class Basket {

	//--++добавление
	static async add(produ) {
		// console.log('produ', produ, '----------produ----------')
		
		const bask = await Basket.fetch()
		// console.log('const bask: ', bask, '---------------basket.js  modes 14-----------------')

		const idx = bask.productss1.findIndex(c => c.id === produ.id)
		// console.log('const idx: ', idx, '------------const idx-------------------------------')

		const candidat = bask.productss1[idx]
		// console.log('const candidat: ', candidat, '========candidat==basket models 18=========когда увел кол-во=======')
		
		if (candidat) {
			//курс есть
			candidat.count++
			candidat.total = +candidat.price * candidat.count
			bask.productss1[idx] = candidat
		} else {
			//нужно добавить
			produ.count = 1
			produ.total = produ.price
			bask.product.push(produ)
		}
		bask.price += +produ.price

		return new Promise((resolve, reject) => {
			fs.writeFile(aP, JSON.stringify(bask), err => {
				if (err) {
					reject(err)
				}
				else {
					resolve(bask)
				}
			})
		})
	}

	//--++ удаление
	static async remove(id) {
		const card1 = await Basket.fetch()
		// console.log('const card1: ', card1, '-------------models remove ')

		const idx = card1.product.findIndex(c => c.id === id)
		// console.log('const idx: ', idx, '-----------models remove')

		const lol = card1.product[idx]
		// console.log('const lol:', lol, '-----------models')

		if (lol.count === 1) {
			//удалить
			card1.product = card1.product.filter(k => k.id !== id)
		} else {
			//изменить кол-во
			card1.product[idx].count--
			//----------------------------
			card1.product[idx].total = card1.product[idx].total - +card1.product[idx].price
			//----------------------------
		}
		card1.price -= lol.price

		return new Promise((resolve, reject) => {
			fs.writeFile(aP, JSON.stringify(card1), err => {
				if (err) {
					reject(err)
				}
				else {
					resolve(card1)
				}
			})
		})
	}


	static async fetch() {         //Статические свойства используются в тех случаях, когда мы хотели бы сохранить данные на уровне класса, а не какого-то одного объекта.
		return new Promise((resolve, reject) => {
			fs.readFile(aP, 'utf-8', (err, content) => {
				if (err) {
					reject(err)
				}
				else {
					resolve(JSON.parse(content))
				}
			})
		})
	}
}

module.exports = Basket