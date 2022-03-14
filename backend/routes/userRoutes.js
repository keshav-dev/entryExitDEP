const express = require("express");
const { registerStudent, confirmOtp, passwordChange, loginStudent } = require("../controllers/userControllers");


const router = express.Router();

router.route('/register').post(registerStudent)
router.route('/register/otp').post(confirmOtp)
router.route('/register/password').post(passwordChange)

router.route('/login').post(loginStudent);





module.exports = router;