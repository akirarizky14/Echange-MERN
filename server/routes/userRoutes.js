const express = require('express');
const {loginUser,signupUser, getUsers,changePassword,deleteuser, loginAdmin} = require('../controller/userControllers');
const adminauth = require('../middleware/adminauth');
const router = express.Router();
router.post('/login', loginUser);
router.post('/loginAdmin', loginAdmin);
router.put('/changepassword',changePassword);
router.delete('/deleteuser',deleteuser);
router.post('/register', signupUser);
router.use(adminauth)
router.get('/',getUsers)

module.exports = router;