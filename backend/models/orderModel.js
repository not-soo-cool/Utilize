import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    customer_name: {
        type: String,
    },
    customer_email: {
        type: String,
        default: "example@gmail.com"
    },
    product: {
        type: String,
        default: "Product 1"
    },
    quantity: {
        type: Number,
        default: 0,
    },
    order_value: {
        type: Number,
        default: 0,
    }
})

export const Order = mongoose.model("Order", orderSchema)