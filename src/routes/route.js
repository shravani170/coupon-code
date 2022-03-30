const express = require('express');

const router = express.Router();

const coupon=require("../controllers/CouponController")

router.post('/couponCreation',coupon.couponCreation)
router.get('/getAllCoupon',coupon.getcoupon)
router.get('/couponvalidation/:amount/:couponcode',coupon.checkForCoupon)


module.exports = router;