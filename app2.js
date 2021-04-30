const https = require("https")
const http = require("http")
const moment = require("moment")
const request = require('request')
const async = require('async')
const axios = require('axios')
const dotenv = require("dotenv").config()
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
const openWeatherKey = process.env.openWeatherKey
const openWeatherBaseUrl = "api.openweathermap.org/data/2.5/weather?zip=06907"
const openWeatherUrl = openWeatherBaseUrl.concat("&appid=").concat(openWeatherKey)
const acceptableWeatherCodes = [800, 801, 802, 803, 804]
const client = require('twilio')(twilioAccountSid, twilioAuthToken);

console.log("Using ", openskyUrl);

(async () => {
  try {
    const response = await axios.get(openskyUrl)
    console.log("success!", response.data.states)
    var flights = response.data.states.map(state => {
      return aviationstackBaseUrl.concat("?access_key=").concat(aviationstackAccessKey).concat("&flight_icao=").concat(state[1].trim())
    })
    console.log(flights);
    var getFlights = () => flights.map(flight => axios.get(flight))
    axios.all(getFlights())
      .then(function (responses) {
        responses.forEach(response => {
          if (response.data.pagination.total !== 0) {
            console.log(response.data);
          } else {
            console.log("no additional data found");
          }
        })
      })
      .catch(error => console.log(error));
  } catch (error) {
    console.log(error);
  }
})();


 //change this to use axios
getFlightDetails = async function (icao24, callsign, altitude, callback) {
  var aviationstackUrl = aviationstackBaseUrl.concat("?access_key=").concat(aviationstackAccessKey).concat("&flight_icao=").concat(callsign)
  console.log("using ", aviationstackUrl);

  response = await axios.get(aviationstackUrl);
      console.log('body:', response.body);
      if (request.body.pagination.total !== 0) {
        console.log("Adding details for ", callsign);
        return(null, {
          "icao24" : icao24,
          "callsign" : callsign,
          "altitude" : altitude,
          "departure" : response.body.data[0].departure.iata,
          "arrival" : response.body.data[0].arrival.iata,
          "airline" : response.body.data[0].airline.iata,
          "flight" : request.body.data[0].flight.number
        });
        } else {
          console.log("No additional details found for ", callsign);
          callback(null, {
            "icao24" : icao24,
            "callsign" : callsign,
            "altitude" : altitude,
            "departure" : "unknown",
            "arrival" : "unknown",
            "airline" : "unknown",
            "flight" : "unknown"
          });
        }
}

    // async.times(request.body.states.length, function(n, next) {
    //     getFlightDetails(request.body.states[n][0].trim(),request.body.states[n][1].trim(),request.body.states[n][7], function(err, flight) {
    //         next(err, flight);
    //     });
    // }, function(err, flights) {
    //     console.log("flights are ", flights);
    //     for (const flight of flights) {
    //       if (flight.departure !== "unknown") {
    //         var textToSend =''
    //         textToSend = textToSend.concat('Flight ', flight.airline, flight.flight, ' from ', flight.departure, ' to ', flight.arrival, ' is coming at ', flight.altitude*3.28084.toFixed(0), ' feet!' )
    //         client.messages
    //           .create({
    //             to: '+12034706602',
    //             from: '+13235279814',
    //             body: textToSend,
    //           })
    //           .then(message => console.log(message.sid));
    //         client.messages
    //           .create({
    //             to: '+16316785085',
    //             from: '+13235279814',
    //             body: textToSend,
    //           })
    //           .then(message => console.log(message.sid));
    //       }
    //     }
    // });
