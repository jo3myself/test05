var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var axios = require('axios')
var cheerio = require('cheerio')

var PORT = 3000

// Initialize Express
var app = express()

// Configure middleware

// Use morgan logger for logging requests
app.use(logger('dev'))
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }))
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'))

// Routes

// A GET route for scraping the website
app.get('/scrape/:id', function (req, res) {
  // First, we grab the body of the html with request
  axios.get('https://www.kingston.com/us/memory/search?mfr=HEW&line=data%20data&model=' + req.params.id).then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data)

    $('.corner').each(function (i, element) {
      var title = $(element).children('h5').children('span').text()
      var newTitle = title.replace('Solid State Drives (SSD) for ', '')
      title = newTitle.replace('System Specific Memory for ', '')
      if (!title) {
        res.send('blank')
      } else {
        res.json(title)
      }
    })
  })
})

// Start the server
app.listen(PORT, function () {
  console.log('App running on port ' + PORT + '!')
})
