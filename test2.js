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
const states = [
    [
      'aa927a',        'N780W   ',
      'United States', 1617395759,
      1617395760,      -73.683,
      41.0361,         243.84,
      false,           52.97,
      330.95,          -2.28,
      null,            274.32,
      '3065',          false,
      0
    ],
    [
      'a72808',        'N560ML  ',
      'United States', 1617395884,
      1617395888,      -73.6805,
      41.0326,         289.56,
      false,           63.11,
      330.72,          -1.95,
      null,            312.42,
      '2344',          false,
      0
    ],
    [
      'a3fb02',        'N3559Q  ',
      'United States', 1617395909,
      1617395909,      -73.3506,
      41.1675,         548.64,
      false,           76.35,
      85.75,           0.33,
      null,            525.78,
      null,            false,
      0
    ]
  ]

  console.log("before");
  console.log(states);

  // flights = [
  //   "http://api.aviationstack.com/v1/flights?access_key=7743bd2360dcdaa0e1f052dbd7db8e38&flight_icao=N780W",
  //   "http://api.aviationstack.com/v1/flights?access_key=7743bd2360dcdaa0e1f052dbd7db8e38&flight_icao=N560ML",
  //   "http://api.aviationstack.com/v1/flights?access_key=7743bd2360dcdaa0e1f052dbd7db8e38&flight_icao=N3559Q"
  // ]
(async () => {
  var flights = states.map(state => {
    return aviationstackBaseUrl.concat("?access_key=").concat(aviationstackAccessKey).concat("&flight_icao=").concat(state[1].trim())
  })
  console.log(flights);
  var getFlights = () => flights.map(flight => axios.get(flight))
  axios.all(getFlights())
    .then(function (responses) {
      responses.forEach(response => {
          console.log(response.data);
      })
    })
    .catch(error => console.log(error));
})();

console.log("after");


  // async function fetchAllFlights(flights) {
  //   const promises = states.map(async state => {
  //     const response = await axios.get(aviationstackBaseUrl.concat("?access_key=").concat(aviationstackAccessKey).concat("&flight_icao=").concat(state[1].trim()));
  //     if (response.body.pagination.total !== 0) {
  //       console.log("Adding details for ", callsign);
  //       let flight = {
  //         "icao24" : state[0].trim(),
  //         "callsign" : state[1].trim(),
  //         "altitude" : state[7],
  //         "departure" : response.body.data[0].departure.iata,
  //         "arrival" : response.body.data[0].arrival.iata,
  //         "airline" : response.body.data[0].airline.iata,
  //         "flight" : response.body.data[0].flight.number
  //       };
  //       } else {
  //       console.log("No additional details found for ", callsign);
  //       let flight = {
  //         "icao24" : state[0].trim(),
  //         "callsign" : state[1].trim(),
  //         "altitude" : state[7],
  //         "departure" : "unknown",
  //         "arrival" : "unknown",
  //         "airline" : "unknown",
  //         "flight" : "unknown"
  //       };
  //       }
  //     Promise.all(promises).then(
  //       return flight
  //     )
  //   });
  // }



// async getFlightDetails = (state) => {
//   var aviationstackUrl = aviationstackBaseUrl.concat("?access_key=").concat(aviationstackAccessKey).concat("&flight_icao=").concat(state[1].trim())
//   response = await axios.get(aviationstackUrl)
//   if (response.body.pagination.total !== 0) {
//     console.log("Adding details for ", callsign);
//     return(null, {
//       "icao24" : icao24,
//       "callsign" : callsign,
//       "altitude" : altitude,
//       "departure" : response.body.data[0].departure.iata,
//       "arrival" : response.body.data[0].arrival.iata,
//       "airline" : response.body.data[0].airline.iata,
//       "flight" : response.body.data[0].flight.number
//     });
//     } else {
//       console.log("No additional details found for ", callsign);
//       callback(null, {
//         "icao24" : icao24,
//         "callsign" : callsign,
//         "altitude" : altitude,
//         "departure" : "unknown",
//         "arrival" : "unknown",
//         "airline" : "unknown",
//         "flight" : "unknown"
//       });
//     }
//   return {
//     {
//       "icao24" : icao24,
//       "callsign" : callsign,
//       "altitude" : altitude,
//       "departure" : response.body.data[0].departure.iata,
//       "arrival" : response.body.data[0].arrival.iata,
//       "airline" : response.body.data[0].airline.iata,
//       "flight" : response.body.data[0].flight.number
//     }
//         }
// }
