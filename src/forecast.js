const request = require('request')

// weather request
const forecast = (lat, long, callback) => {
    const weatherURL = 'https://api.darksky.net/forecast/687e4462f8a363e9fae91bc32e610442/' + lat + ',' + long + '?units=si'
    request({
        url: weatherURL,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to access the weather service', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = response.body.currently
            callback(undefined, data.summary + ' throughout the day. It is currently ' + data.temperature + ' degrees out with a ' + data.precipProbability * 100 + '% chance of precepitation')
        }
    })
}

module.exports = {
    forecast: forecast
}