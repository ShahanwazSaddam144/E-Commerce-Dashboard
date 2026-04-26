const mongoose = require("mongoose");

const orderstatusschema = new mongoose.Schema({
    orderId: { type: String, required: true },
    orderStatus: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("OrderStatus", orderstatusschema);