var watson = require('watson-developer-cloud');
const axios = require('axios');
var alchemy_language = watson.alchemy_language({
  api_key: '07109bffb1d08bf7d265c68183e8a2491d8091c3'
});

// require('dotenv').config();


exports.getSearch = function (callback, req, res) {
  console.log('req.body: ', req.body)
  req.body.msgs.forEach((element) => {

    let parameters = {
      text: element
    };

    alchemy_language.emotion(parameters, function (err, response) {
      if (err)
        console.log('error:', err);
      else {
        console.log(JSON.stringify(response, null, 2))
        res.socketEmitter('watson', response)

      }
    });
  });

  req.body.pics.forEach((element) => {
   axios.post('https://api.projectoxford.ai/emotion/v1.0/recognize',
     {
       url: element
     },
     {
       headers: {
         'Content-Type': 'application/json',
         'Ocp-Apim-Subscription-Key': '90319f9a0f6b41539002421041906eed'
       }
     })
     .then(response => {
       res.socketEmitter('microsoft', response.data)
     })
     .catch(console.error)

  });

  callback(null, 'socket on');
};

exports.getStream = function(callback, query, res) {

};

exports.getLocationStream = function (callback, query, response) {


};
