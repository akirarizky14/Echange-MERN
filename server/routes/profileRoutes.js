const express = require('express');
const {getProfile} = require('../controller/profileControllers');
const requireauth = require('../middleware/requireauth');
const router = express.Router();
router.use(requireauth)
router.get('/getprofile',getProfile)

module.exports = router;    