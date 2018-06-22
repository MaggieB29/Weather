const request = require('request');
const yargs = require('yargs');

const GoogleAPI = 'AIzaSyDMgsp68WJ4MwNY9u66TY2nuDGiTtaS9gc';
const DarkSky = '85693fe78a243ea6c99ec85b0f8263ef';

var address = yargs.argv.a; //a é o nome da cena, tem de ter sempre um nome
//para chamar metemos o nome na console e a rua
/*"D. Sancho I, Vila do Conde";*/
var addressEncoded = encodeURIComponent(address);

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}&key=${GoogleAPI}`,
    json: true
}, (error, response, body) => {
    var lat = body.results[0].geometry.location.lat; //chama a latitude
    var lng = body.results[0].geometry.location.lng;
    var formatted_address = body.results[0].formatted_address;

    console.log(formatted_address); //imprimi o adereço todo bonito

    request({
        url: `https://api.darksky.net/forecast/${DarkSky}/${lat},${lng}?units=si`,
        json: true
    }, (DSerror, Dresponse, DSbody)=> {

        var temperature = DSbody.currently.temperature;
        var apparentTemperature = DSbody.currently.apparentTemperature;

        console.log(temperature, apparentTemperature);
    })
});