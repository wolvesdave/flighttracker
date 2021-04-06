const request = require('request');

request('https://opensky-network.org/api/states/all?lamin=40.94&lomin=-73.69&lamax=41.3&lomax=-73.22', function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    console.log('body:', body);
  }
});
