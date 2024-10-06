const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')

const teams = []
const site = 'https://www.scrapethissite.com/pages/forms/'
request(site, scrape)

function scrape(error, response, html) {
	if (error) { console.error(error) }
	const $ = cheerio.load(html)
	const teams_div = $('tr.team')
	console.log(`We are going to push ${teams_div.length} team's data.`)
	teams_div.each((idx, el) => {
		teams.push({
			name: $(el).children('td.name').text(),
			year: $(el).children('td.year').text(),
			wins: $(el).children('td.wins').text(),
			losses: $(el).children('td.losses').text(),
			ot_losses: $(el).children('td.ot-losses').text(),
			win_rate: $(el).children('td.pct').text(),
			gf: $(el).children('td.gf').text(),
			ga: $(el).children('td.ga').text(),
			diff: $(el).children('td.diff').text()
		})
	})
}

console.log('done')