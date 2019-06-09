const express = require('express')
const path = require('path')
const hbs = require('hbs')
const GetLocation = require('./geoCode')
const Forecaster = require('./forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// instantiate the express object
const app = express()

// define paths
const publicDir = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../templates/views')
const partialDir = path.join(__dirname, '../templates/partials')

// use public directory for static assets
app.use(express.static(publicDir))

// set handlebars as the template engine
app.set('view engine', 'hbs')
// by default express looks for the 'views' folder in root directory 
// but we use a custom name so we have to explicitly state it
app.set('views', viewDir)
// set partial directory
hbs.registerPartials(partialDir)

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Musab',
        location: 'Whitby',
        title: 'About'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: "You must provide a search term"
        })
    } else {
        console.log(req.query)
        res.send({
            products: []
        })
    }

})

app.get('/weather/forecast', (req, res) => {
    if (!req.query.location) {
        res.send({
            error: "You must provide a location"
        })
    } else {
        GetLocation.geoCode(req.query.location, (error, GeoData) => {
            // end if there is an error
            if (error) {
                return res.send(error)
            }
            // use the data object we got from geocoding
            Forecaster.forecast(GeoData.latitude, GeoData.longitude, (error, ForecastData) => {
                // end it there is an error
                if (error) {
                    return res.send(error)
                }
                // both api calls succeeded so send back the data
                res.send({
                    location: GeoData.location,
                    forecast: ForecastData
                })
            })
        })
    }
})

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Weather App',
    })

})

app.get('*', (req, res) => {
    res.render('my404', {
        errorMessage: "These are not the droids you are looking for"
    })
})

// start the server on port 3000
app.listen(3000, () => {
    console.log('server started on port 3000')
})