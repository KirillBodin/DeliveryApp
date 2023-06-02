const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Restaurant = require('./schema/restaurantSchema')
const Coupon = require('./schema/couponSchema')
const Order = require('./schema/orderSchema');

const app = express();
const port = 3000;

const uri = 'mongodb+srv://@cluster0.';//Код подключения к базе

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB Atlas:', err);
    });


app.get('/restaurants', (req, res) => {
    Restaurant.find({}).select('id name image dishes').exec()
        .then(restaurants => {
            res.json(restaurants);
        })
        .catch(err => {
            console.error('Failed to retrieve restaurant data:', err);
            res.status(500).json({error: 'Failed to retrieve restaurant data'});
        });
});


app.get('/coupons', (req, res) => {
    Coupon.find({})
        .then(coupons => {
            res.json(coupons);
        })
        .catch(err => {
            console.error('Failed to retrieve coupons:', err);
            res.status(500).json({error: 'Failed to retrieve coupons'});
        });
});


app.get('/coupons/:couponCode', (req, res) => {
    const couponCode = req.params.couponCode;
    Coupon.findOne({code: couponCode})
        .exec()
        .then(coupon => {
            if (coupon) {
                res.json(coupon);
            } else {
                res.status(404).json({error: 'Invalid coupon code'});
            }
        })
        .catch(error => {
            res.status(500).json({error: 'An error occurred'});
        });
});


app.use(express.static('src'));

app.get('/shop.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/shop.html'));
});
app.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/cart.html'));
});
app.get('/coupons.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/coupons.html'));
});


app.post('/submit-order', (req, res) => {
    const { name, email, phone, address } = req.body;

    const order = new Order({
        name,
        email,
        phone,
        address,
    });

    order.save()
        .then(() => {
            res.json({ message: 'Order submitted successfully' });
            console.log('Order submitted successfully');
        })
        .catch((error) => {
            console.error('Error submitting order:', error);
            res.status(500).json({ error: 'Failed to submit order' });
        });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});