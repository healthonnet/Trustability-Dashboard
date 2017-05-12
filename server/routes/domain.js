'use strict';

const fs = require('fs');
const https = require('https');
const router = require('express').Router();
const HON_CONDUCTS = './server/HONconducts';
const APIKCONNECT_HOST = 'apikconnect.honservices.org';
const APIKCONNECT_PATH = '/~kconnect/cgi-bin/gold-standard-couch.cgi';

router.get('/', (req, res) => {
  res.json({
    message: 'nothing to show.',
  });
});

router.get('/:domain', (req, res) => {
  let database = req.query.database || 'khresmoi';
  const options = {
    hostname: APIKCONNECT_HOST,
    path: APIKCONNECT_PATH + '?database=' + database +
      '&domain=' + req.params.domain,
    method: 'GET',
    port: 443,
    json: true,
  };

  let request = https.request(options, httpsRes => {
    let data = '';
    httpsRes.on('data', chunk => {
      data += chunk;
    });
  });

  request.on('response', response => {
    let data = '';
    response.on('data', chunk => {
      data += chunk;
    });
    response.on('end', () => {
      data = JSON.parse(data);
      var result = [];
      if (data.results) {
        for(var i = 0; i < data.results.length; i++) {
          result[i] = {
            host: data.results[i].value.url,
            found: data.results[i].value.result,
          };
        }
      }
      res.json(result);
    });
  });

  request.on('error', err => {
    console.log(err);
    return res.status(400).json({
      type: 'error',
      message: 'could not read data from API Kconnect.',
      error: err,
    });
  });

  request.end();

});

module.exports = router;
