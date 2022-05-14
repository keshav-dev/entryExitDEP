const express = require("express");
const { registerStudent, confirmOtp, passwordChange, loginStudent, getStudentInfo } = require("../controllers/userControllers");


const router = express.Router();

router.route('/register').post(registerStudent)
router.route('/register/otp').post(confirmOtp)
router.route('/register/password').post(passwordChange)
router.route('/studentInfo').post(getStudentInfo);

router.route('/login').post(loginStudent);





module.exports = router;