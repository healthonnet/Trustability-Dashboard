'use strict';

const router = require('express').Router();
const nodePackage = require('../../package.json');

router.get('/', (req, res) => {
  res.json({
    name: nodePackage.name,
    version: nodePackage.version,
  });
});

module.exports = router;
