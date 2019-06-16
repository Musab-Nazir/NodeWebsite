const request = require('request')

const geoCode = (address, callback) => {
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWxldmVudGgiLCJhIjoiY2p3ZnB4cjU3MTh3bjN6cXIzd2lsNTRvbCJ9.XAcuxx_-g6MD679mQK94XQ&limit=1'
    request({
        url: geoURL,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback('Location could not be found', undefined)
        } else {
            const data = response.body.features[0]
            // console.log(data.center[1], data.center[0])
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            })
        }
    })
}

module.exports = {
    geoCode: geoCode
}