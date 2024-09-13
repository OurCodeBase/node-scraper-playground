const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')

const site = 'https://www.scrapethissite.com/pages/simple/'
request(site, scrape)

function scrape(error, response, html) {
	if (error) { console.error(error) }
	const $ = cheerio.load(html)
	const country_array = []
	const country_div = $('div.country')
	console.log(`There are ${country_div.length} divs available here.`)
	country_div.each((idx, el) => {
		const country_name = $(el)
			.children('h3.country-name')
			.contents()
			.filter(function() {
				return this.type === 'text'
			})
			.text()
			.trim()
		const country_capital = $(el).find('span.country-capital').text()
		const country_population = $(el).find('span.country-population').text()
		const country_area = $(el).find('span.country-area').text()
		country_array.push({
			name: country_name,
			capital: country_capital,
			population: country_population,
			area: country_area
		})
	})
	fs.writeFile('data.json', JSON.stringify(country_array, null, 2), (error) => {
		if (!error) {
			console.log('Finally data file has filled with data.')
		}
	})
}