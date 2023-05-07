const express = require('express');
const {postbank, getbank} = require('../controller/bankControllers');
const requireauth = require('../middleware/requireauth');
const router = express.Router();
router.use(requireauth)
router.post('/postbank',postbank)
router.get('/getbank',getbank)

module.exports = router;    