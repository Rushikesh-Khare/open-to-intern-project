const express = require('express');
const router = express.Router();
const {createCollege, createIntern, collegeDetails} = require('../controller/controller');
router.post('/functionup/colleges', createCollege);
router.post('/functionup/interns', createIntern);
router.get('/functionup/collegeDetails', collegeDetails);
module.exports = router;