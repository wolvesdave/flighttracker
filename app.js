const https = require("https")
const moment = require("moment")
const openskyBaseUrl = "https://opensky-network.org/api/states/all"
const latitudeMin = 40.94
const longitudeMin = -73.69
const latitudeMax = 41.3
const longitudeMax = -73.22
const openskyUrl = openskyBaseUrl.concat("?lamin=").concat(latitudeMin).concat("&lomin=").concat(longitudeMin).concat("&lamax=").concat(latitudeMax).concat("&lomax=").concat(longitudeMax)
const aviationstackBaseUrl = "http://api.aviationstack.com/v1/flights"
const aviationstackAccessKey = "7743bd2360dcdaa0e1f052dbd7db8e38"
const aviationstackUrl = aviationstackBaseUrl.concat("?access_key=").concat(aviationstackAccessKey)

console.log("Using ", openskyUrl, " and ", aviationstackUrl);

https.get(openskyUrl, res => {
  let data = ""

  res.on("data", d => {
    data += d
  })
  res.on("end", () => {
    flightobject=JSON.parse(data)
    console.log(flightobject);
    var i = 0
    var flights=[]
    for (const state of flightobject.states) {
      flights.push(
        {icao24:state[0].trim()},
        {callsign:state[1].trim()}
    )
    }
    console.log("flights are ", flights, "at ", moment().unix());
  })
})

function getFlightDetails(icao24) {

}
