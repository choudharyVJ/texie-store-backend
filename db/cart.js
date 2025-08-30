const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId , ref: 'users'},
    productId: Array(string)
});

const cart = mongoose.model('carts', cartSchema);
module.exports = cart;