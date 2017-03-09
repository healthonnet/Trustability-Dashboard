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

router.post('/', (req, res) => {
  if (!(req.files && req.files.conducts)) {
    return res.json({
      type: 'error',
      message: 'No file has been uploaded.',
    });
  }
  const data = req.files.conducts.data;
  fs.writeFile(HON_CONDUCTS + '/conducts.json', data, err => {
    if (err) {
      return res.json({
        type: 'error',
        message: 'Error while writing the file',
        error: err,
      });
    }
    res.json({
      message: 'file has been uploaded.',
      size: Object.keys(JSON.parse(data)).length,
    });
  });
});

router.get('/:conduct', (req, res) => {
  const conduct = 'HONConduct' + req.params.conduct;
  fs.readFile(HON_CONDUCTS + '/conducts.json', (err, data) => {
    if (err) {
      return res.json({
        type: 'error',
        message: 'No HONConduct file has been uploaded. Please provide one.',
        error: err,
      });
    }

    data = JSON.parse(data);

    // No HONConduct with :conduct number was found
    if (!(data && (conduct in data))) {
      return res.json({
        type: 'error',
        message: conduct + ' was not found.',
      });
    }

    // Fetch content on API Kconnect
    https.get(
      APIKCONNECT + '?data={"url":"http://' + data[conduct].domain[0] + '"}',
      httpsRes => {
      httpsRes.on('data', data => {
        const trustability = JSON.parse(data).trustability;
        res.json({
          trustability: trustability,
        });
      });
    }).on('error', err => {
      return res.json({
        type: 'error',
        message: 'could not read data from API Kconnect.',
        error: err,
      });
    });
  });
});

module.exports = router;
