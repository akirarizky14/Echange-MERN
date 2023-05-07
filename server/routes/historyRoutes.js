const express = require('express');
const router = express.Router();
const historyController = require('../controller/historyControllers');
const requireauth = require('../middleware/requireauth');
const adminauth = require('../middleware/adminauth');
router.post('/createHistory', historyController.createHistory);
router.delete('/deleteExchange/:id', historyController.deleteExchange);
router.get('/getHistory', historyController.getHistory);
router.get('/getHistory', historyController.getHistory);

router.use(requireauth)
router.get('/getHistoryId', historyController.getHistoryId);





module.exports = router;
