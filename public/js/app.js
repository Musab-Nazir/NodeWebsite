console.log('client side javascript file is loaded')


var form = $('#myForm')
console.log(form.children()[0])
form.on('submit', (e) => {
    $('#location').text('Loading...')
    e.preventDefault()
    var address = form.children()[0].value
    console.log(address)
    fetch('http://localhost:3000/weather/forecast?location=' + address).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log(data.forecast)
                $('#location').text(data.location)
                $('#forecast').text(data.forecast)
            }
        })
    })
})