const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

class Products {
	constructor(title, price, img) {
		this.title = title
		this.price = price
		this.img = img
		this.id = uuidv4()
	}

	toJSON() {
		return {
			title: this.title,
			price: this.price,
			img: this.img,
			id: this.id
		}
	}

	static async update(c) {
		const pro = await Products.getAll()

		const indx = pro.findIndex(q => q.id === c.id)
		pro[indx] = c

		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, '..', 'data', 'products.json'),
				JSON.stringify(pro),
				(err) => {
					if (err) {
						reject(err)
					} else {
						resolve()
					}
				}
			)
		})
	}

	async save() {
		const products = await Products.getAll()
		products.push(this.toJSON())
		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, '..', 'data', 'products.json'),
				JSON.stringify(products),
				(err) => {
					if (err) {
						reject(err)
					} else {
						resolve()
					}
				}
			)
		})

	}

	static getAll() {
		return new Promise((resolve, reject) => {
			fs.readFile(
				path.join(__dirname, '..', 'data', 'products.json'),
				'utf-8',
				(err, content) => {
					if (err) {
						reject(err)
					} else {
						resolve(JSON.parse(content))
					}
				}
			)
		})
	}

	static async getById(id) {
		const products = await Products.getAll()
		return products.find(c => c.id === id)
	}
}

module.exports = Products