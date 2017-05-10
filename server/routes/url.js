'use strict';

const fs = require('fs');
const https = require('https');
const router = require('express').Router();
const HON_CONDUCTS = './server/HONconducts';
const APIKCONNECT = 'https://apikconnect.honservices.org/~kconnect/' +
  'cgi-bin/trustability.cgi';

router.get('/', (req, res) => {
  res.json({
    message: 'nothing to show.',
  });
});

router.get('/:url', (req, res) => {
  https.get(
    APIKCONNECT + '?data={"url":"' + req.params.url + '"}',
    httpsRes => {
    httpsRes.on('data', data => {
      const trustability = JSON.parse(data).trustability;
      const found = [];
      found[0] = trustability['Advertising policy'] ? 1 : 0;
      found[1] = trustability.Attribution ? 1 : 0;
      found[2] = trustability.Authoritative ? 1 : 0;
      found[3] = trustability.Complementarity ? 1 : 0;
      found[4] = trustability.Date ? 1 : 0;
      found[5] = trustability['Financial disclosure'] ? 1 : 0;
      found[6] = trustability.Justifiability ? 1 : 0;
      found[7] = trustability.Privacy ? 1 : 0;
      found[8] = trustability.Transparency ? 1 : 0;
      res.json({
        host: req.params.url,
        found: found,
      });
    });
  }).on('error', err => {
    return res.status(400).json({
      type: 'error',
      message: 'could not read data from API Kconnect.',
      error: err,
    });
  });
});

module.exports = router;
