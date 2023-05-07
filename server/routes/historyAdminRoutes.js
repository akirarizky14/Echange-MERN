const express = require('express');
const router = express.Router();
const historyController = require('../controller/historyControllers');

const adminauth = require('../middleware/adminauth');
router.use(adminauth)
router.get('/getHistory', historyController.getHistory);



module.exports = router;
