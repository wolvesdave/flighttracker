var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    parseString = require('xml2js').parseString,
    request = require('request'),
    https = require('https'),
    post = require('http-post')
    flights='';
  const options = {
      hostname: 'opensky-network.org',
      port: 443,
      path: '/api/states/all?lamin=40.94&lomin=-73.69&lamax=41.3&lomax=-73.28',
      method: 'GET'
    }

    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', d => {
            flights+= d;
            process.stdout.write(flights);
      })
      return flights
    })

    req.on('error', error => {
      console.error(error)
    })

    req.end()

    console.log(req);




    //
    //
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
