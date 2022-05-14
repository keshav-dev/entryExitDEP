const express = require("express");
// const {loginSecurity,scanStudent,getHistory} = require('../controllers/securityControllers');
const {loginAdmin,getStudentsIn, uploadStudents, saveReports, approveReport, denyReport, getReports} = require('../controllers/adminController');

const router = express.Router();

router.route('/login').post(loginAdmin);
router.route('/download/studentsIn').post(getStudentsIn);
router.route('/upload').post(uploadStudents);
router.route('/report').post(saveReports);
router.route('/reports').get(getReports);
router.route('/approve').post(approveReport);
router.route('/deny').post(denyReport);

module.exports = router;