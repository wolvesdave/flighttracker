const https = require("https")
const http = require("http")
const moment = require("moment")
const openskyBaseUrl = "https://opensky-network.org/api/states/all"
const latitudeMin = 40.94
const longitudeMin = -73.69
const latitudeMax = 41.3
const longitudeMax = -73.22
const openskyUrl = openskyBaseUrl.concat("?lamin=").concat(latitudeMin).concat("&lomin=").concat(longitudeMin).concat("&lamax=").concat(latitudeMax).concat("&lomax=").concat(longitudeMax)
const aviationstackBaseUrl = "http://api.aviationstack.com/v1/flights"
const aviationstackAccessKey = "7743bd2360dcdaa0e1f052dbd7db8e38"

console.log("Using ", openskyUrl);

https.get(openskyUrl, res => {
  let data = ""

  res.on("data", d => {
    data += d
  })
  res.on("end", () => {
    stateObject=JSON.parse(data)
    if (stateObject.states != null) {
      console.log("state Object: ", stateObject);
      var i = 0
      var flights=[]
      for (const state of stateObject.states) {
        flightDetails = getFlightDetails(state[1].trim())
        var flightInfo = Object.assign({},
          {icao24:state[0].trim(), callsign:state[1].trim()},
          flightInfo)
        flights.push(flightInfo)
      }
      console.log("flights are ", flights, "at ", moment().unix());
    } else {
      console.log("NO FLIGHTS FOUND!");
    }
  })
})

function getFlightDetails(icao24) {
  const aviationstackUrl = aviationstackBaseUrl.concat("?access_key=").concat(aviationstackAccessKey).concat("&flight_icao=").concat(icao24)
  console.log("using ", aviationstackUrl);

  http.get(aviationstackUrl, res => {
    let data = ""

    res.on("data", d => {
      data += d
    })
    res.on("end", () => {
      flightObject=JSON.parse(data)
      console.log("flight Object: ", flightObject);
      flightDetails = {
        "departure" : flightObject.data[0].departure.iata,
        "arrival" : flightObject.data[0].arrival.iata,
        "airline" : flightObject.data[0].airline.iata,
        "flight" : flightObject.data[0].flight.number
      }
      console.log("flight details are ", flightDetails);
      return flightDetails;
    })
  })
}
