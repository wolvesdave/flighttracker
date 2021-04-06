// Twilio Credentials
// To set up environmental variables, see http://twil.io/secure
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = "ACeed5f77ff1c3f3bbd24ca962f54493ea"
const authToken = "77bf5dd0d27da669b63f0839d75636bc"

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    to: '+12034706602',
    from: '+13235279814',
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  })
  .then(message => console.log(message.sid));
