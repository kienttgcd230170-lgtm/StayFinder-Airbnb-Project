const express = require('express');
const controller = require('../controllers/bookingController');
const router = express.Router();

router.get('/', controller.listBookings);
router.post('/', controller.createBooking);
module.exports = router;
