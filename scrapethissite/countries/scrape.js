const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')

const site = 'https://www.scrapethissite.com/pages/simple/'

// these callbacks are asyncronus. that means the function will execute at last of this code.
request(site, scrape)

// error contains error messages.
// response contains status codes and others.
// html contains full html body.
function scrape(error, response, html) {
	if (error) { console.error(error) }
	// this parse html to javascript.
	// you can consider this as selector in jquery or query.
	const $ = cheerio.load(html)
	const country_array = []
	// basic of selecting an element.
	const country_div = $('div.country')
	console.log(`There are ${country_div.length} divs available here.`)
	// each method is used to manipulate a list of selected elements.
	// idx is the index and el is the element (for each).
	country_div.each((idx, el) => {
		const country_name = $(el)
			// this selects childern elements of parant element el.
			.children('h3.country-name')
			// this gives you all contents like an element or textnodes in a selected element.
			.contents()
			// this filters elements or textnodes inside contents.
			.filter(function() {
				return this.type === 'text'
			})
			.text()
			.trim()
		// find method finds and select element.
		// text method gives you text or node inside the selected element.
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