const express = require("express");
const {loginSecurity,scanStudent,getHistory} = require('../controllers/securityControllers');

const router = express.Router();

router.route('/login').post(loginSecurity);
router.route('/onscan').post(scanStudent);
router.route('/history').post(getHistory);

module.exports = router;