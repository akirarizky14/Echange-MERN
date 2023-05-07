const express = require('express');
const {getBankDetails} = require('../controller/bankControllers');
const adminauth = require('../middleware/adminauth');
const router = express.Router();
router.use(adminauth)

router.get('/getbankAll',getBankDetails)

module.exports = router;    