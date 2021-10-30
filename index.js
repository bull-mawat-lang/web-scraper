const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const URL = 'https://www.theguardian.com/uk'
axios(URL).then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const articles = []
    $('.fc-item__content', html).each(function() {
        const url = $(this).find('a').attr('href')
        const heading = $(this).find('.js-headline-text').text().replace(/\\n/g, '').trim()
        const more = $(this).find('.fc-item__standfirst').text().replace(/\\n/g, '').trim()    
        articles.push({
            heading,
            more,
            url
        })
    })
    console.log(articles)
}).catch(err => console.log(err))


const app = express();
//app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
