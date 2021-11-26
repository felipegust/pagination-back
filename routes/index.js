var express = require('express');
var router = express.Router();
const { getItens, getCount } = require('../controller/itens')
var mongoUtil = require('../services/db')


mongoUtil.connectToServer(function (err) {
  if (err) console.log(err);

  router.get('/itens', getItens);
  router.get('/count', getCount)
});

module.exports = router;
