const express = require('express');
const {postExchange, getExchange,getExchangeID} = require('../controller/exchangeControllers');
const requireauth = require('../middleware/requireauth');
const router = express.Router();
router.get('/getExchange',getExchange)
router.use(requireauth)
router.get('/getExchangeID',getExchangeID)
router.post('/postExchange',postExchange)

module.exports = router;    