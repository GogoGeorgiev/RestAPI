const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    products:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }],
    status: {
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model('Order', orderSchema);