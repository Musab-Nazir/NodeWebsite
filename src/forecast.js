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
            const data = response.body
            // console.log(data)
            callback(undefined, data.currently.summary + ' throughout the day. It is currently ' + data.currently.temperature + '\xB0C out with a ' + data.currently.precipProbability * 100 + '% chance of precepitation. The temperature high is ' + data.daily.data[0].temperatureHigh + '\xB0C and the low is expected to be ' + data.daily.data[0].temperatureLow + '\xB0C')



        }



    })



}







module.exports = {
    forecast: forecast
}