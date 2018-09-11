const mongosse = require('mongoose');

const productSchema = mongosse.Schema({
    _id: mongosse.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImage: { type: String, required: true }
});

module.exports = mongosse.model('Product', productSchema)