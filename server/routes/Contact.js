const { contactUs } = require('../controllers/ContactUs');
const router = require('express').Router();

router.post('/contactUs', contactUs)

module.exports = router;