
const mongosse = require('mongoose');

const productSchema = mongosse.Schema({
    _id : mongosse.Schema.Types.ObjectId,
    name : String,
    price : Number
});

module.exports = mongosse.model('Product',productSchema)