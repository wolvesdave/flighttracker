
const request = require('request')
const async = require('async')
const moment = require("moment")
const aviationstackBaseUrl = "http://api.aviationstack.com/v1/flights"
const aviationstackAccessKey = "7743bd2360dcdaa0e1f052dbd7db8e38"
const stateObject = {
  time: 1617395930,
  states: [
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
}

console.log("state Object: ", stateObject);
var getFlightDetails = function (icao24, callsign, callback) {
  const aviationstackUrl = aviationstackBaseUrl.concat("?access_key=").concat(aviationstackAccessKey).concat("&flight_icao=").concat(callsign)
  console.log("using ", aviationstackUrl);

  request(aviationstackUrl, function (err, response, body) {
    if(err){
      console.log('error:', error);
    } else {
      console.log('body:', body);
      flightObject=JSON.parse(body)
      console.log("flight Object: ", flightObject);
      if (flightObject.pagination.total !== 0) {
        console.log("Adding details for ", callsign);
        callback(null, {
          "icao24" : icao24,
          "callsign" : callsign,
          "departure" : flightObject.data[0].departure.iata,
          "arrival" : flightObject.data[0].arrival.iata,
          "airline" : flightObject.data[0].airline.iata,
          "flight" : flightObject.data[0].flight.number
        });
        } else {
          console.log("No additional details found for ", callsign);
          callback(null, {
            "icao24" : icao24,
            "callsign" : callsign
          });
        }
    }
  });
}

async.times(stateObject.states.length, function(n, next) {
    getFlightDetails(stateObject.states[n][0].trim(),stateObject.states[n][1].trim(), function(err, flight) {
        next(err, flight);
    });
}, function(err, flights) {
    console.log("flights are ", flights);
});
