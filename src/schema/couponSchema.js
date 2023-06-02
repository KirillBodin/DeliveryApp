const mongoose = require('mongoose');
const couponSchema = new mongoose.Schema({
    name: String,
    image: String,
    code: Number
});

const Coupon = mongoose.model('Coupon', couponSchema);


module.exports = Coupon;