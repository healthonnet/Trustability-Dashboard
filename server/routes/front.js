'use strict';

const router = require('express').Router();
const nodePackage = require('../../package.json');

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

module.exports = router;
