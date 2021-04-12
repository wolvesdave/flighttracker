const https = require("https")
const http = require("http")
const moment = require("moment")
const request = require('request')
const async = require('async')
const dotenv = require("dotenv").config()
const axios = require('axios')
const openskyBaseUrl = "https://opensky-network.org/api/states/all"
const latitudeMin = 40.94
const longitudeMin = -73.69
const latitudeMax = 41.3
const longitudeMax = -73.22
const openskyUrl = openskyBaseUrl.concat("?lamin=").concat(latitudeMin).concat("&lomin=").concat(longitudeMin).concat("&lamax=").concat(latitudeMax).concat("&lomax=").concat(longitudeMax)
const aviationstackBaseUrl = "http://api.aviationstack.com/v1/flights"
const aviationstackAccessKey = process.env.aviationstackAccessKey
const twilioAccountSid = process.env.twilioAccountSid
const twilioAuthToken = process.env.twilioAuthToken
const client = require('twilio')(twilioAccountSid, twilioAuthToken);
const openWeatherKey = process.env.openWeatherKey
const openWeatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=06907"
const openWeatherUrl = openWeatherBaseUrl.concat("&appid=").concat(openWeatherKey)
const acceptableWeatherCodes = [800, 801, 802, 803, 804];

(async () => {
  try {
    const response = axios.get(openWeatherUrl)
    console.log("success!", response.body);
  } catch (error) {
    console.log(error.response.body);
  }
  // await request(openWeatherUrl, function (err, response, body) {
  //   if(err){
  //     console.log('error:', err);
  //   } else {
  //     weatherObject=JSON.parse(body)
  //     console.log('weather is ', weatherObject);
  //     weatherCodes = []
  //     weatherObject.weather.forEach(element => weatherCodes.push(element.id));
  //     console.log("weather codes are ", weatherCodes);
  //     const intersection = weatherCodes.filter(element => acceptableWeatherCodes.includes(element));
  //     if (intersection.length !== 0) {
  //       return weatherCodes
  //     } else {
  //       return []
  //     }
  // }
  // });
});
