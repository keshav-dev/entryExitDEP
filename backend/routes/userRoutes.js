const express = require("express");
const { registerStudent, confirmOtp } = require("../controllers/userControllers");


const router = express.Router();

router.route('/register').post(registerStudent)
router.route('/register/otp').post(confirmOtp)




module.exports = router;