const express = require('express');
const routerUser = require('./user.router');
const router = express.Router();
const { verifyJWT } = require('../utils/verifyJWT');
const routerCity = require('./city.router');
const routerHotel = require('./hotel.router');
const routerImage = require('./image.router');
const routerBooking = require('./booking.router');
const routerReview = require('./review.router');

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/cities', routerCity)
router.use('/hotels', routerHotel)
router.use('/images',verifyJWT, routerImage)
router.use('/bookings',verifyJWT, routerBooking)
router.use('/reviews', verifyJWT, routerReview)

module.exports = router;
