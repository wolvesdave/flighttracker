const https = require("https")
const moment = require("moment")

https.get("https://opensky-network.org/api/states/all?lamin=40.94&lomin=-73.69&lamax=41.3&lomax=-73.2", res => {
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






// for (const state of d) {
//   console.log(element);
// }
//
// i = 0
// res.on('data', d => {
//   for (const state of d) {
//     console.log("element ", i, " is ",state);
//     i+=
//   }
