axios=require('axios')
axios.all([
     axios.get('http://api.aviationstack.com/v1/flights?access_key=7743bd2360dcdaa0e1f052dbd7db8e38&flight_icao=N780W'),
     axios.get('http://api.aviationstack.com/v1/flights?access_key=7743bd2360dcdaa0e1f052dbd7db8e38&flight_icao=N560ML'),
     axios.get('http://api.aviationstack.com/v1/flights?access_key=7743bd2360dcdaa0e1f052dbd7db8e38&flight_icao=N3559Q')
   ])
.then(responseArr => {
  //this will be executed only when all requests are complete
  console.log('Date created: ', responseArr[0]);
  console.log('Date created: ', responseArr[1]);
});
