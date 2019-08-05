var request = require('request')
var cheerio = require('cheerio')

request('http://calagator.org/events.html', function (error, response, html) {
  console.log('error: ', error)
  console.log('statusCode:', response && response.statusCode)
  console.log('html:', html)

  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html)

    $('.vevent').each(function () {
      var daysOfWeek = $(this).find('.day_of_week').text().trim().replace(/\s\s+/g, ' ')
      var date = $(this).find('.date').clone().children().remove().end().text().trim().replace(/\s\s+/g, ' ')
      var start = $(this).find('.dtstart').text().trim().replace(/\s\s+/g, ' ')
      var end = $(this).find('.dtend').text().trim().replace(/\s\s+/g, ' ')
      var summary = $(this).find('.summary').text()
      var location = $(this).find('.location').text()

      console.log('Date:\t' + date + ', ' + daysOfWeek+' from ' +start+'-'+end + '\nEvent:\t' + summary + '\nLoc:\t' + location + '\n')
    })
  }
})