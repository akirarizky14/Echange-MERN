const express = require('express');
const {updateExchangee } = require('../controller/exchangeeControllers');

const router = express.Router();

router.put('/updateExchange/:id',updateExchangee)

module.exports = router;    