'use strict';

const fs = require('fs');
const https = require('https');
const router = require('express').Router();
const HON_CONDUCTS = './server/HONconducts';
const APIKCONNECT = 'https://apikconnect.honservices.org/~kconnect/' +
  'cgi-bin/is-trustable.cgi';

router.get('/', (req, res) => {
  res.json({
    message: 'nothing to show.',
  });
});

router.get('/:domain', (req, res) => {
  https.get(
    APIKCONNECT + '?domain=' + req.params.domain + '',
    httpsRes => {
    httpsRes.on('data', data => {
      const trustability = JSON.parse(data).trustability;
      res.json({
        trustability: trustability,
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
