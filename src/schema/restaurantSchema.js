const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    dishes: [
        {
            id: Number,
            name: String,
            image: String,
            price: Number,
        },
    ],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;