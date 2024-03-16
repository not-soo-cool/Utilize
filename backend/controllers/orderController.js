import { Order } from "../models/orderModel.js";


export const createOrder = async (req, res) => {
    try {
        const { id, customer_name, customer_email, product, quantity, order_value } = req.body;

        // let user

        const order = await Order.create({
            id,
            customer_name,
            customer_email,
            product,
            quantity,
            order_value
        })

        res.status(201).json({
            success: true,
            message: "Order Created"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const createBulkOrder = async (req, res) => {
    try {
        const { data } = req.body;

        // let user

        for (const details of data) {
            const order = await Order.create({
                id: details.id,
                customer_name: details.customer_name,
                customer_email: details.customer_email,
                product: details.product,
                quantity: details.quantity,
                order_value: details.order_value
            }) 
        }

        res.status(201).json({
            success: true,
            message: "Bulk Orders Created"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).json({
            success: true,
            orders: orders.reverse()
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const getOrder = async (req, res) => {
    try {
        const { id } = req.body;
        const order = Order.findOne({ id });

        res.status(200).json({
            success: true,
            order
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const updateOrder = async (req, res) => {
    try {
        const { details } = req.body;
        let order = await Order.findOne({ id: details.id });

        if(details.id) order.id = details.id;
        if(details.name) order.customer_name = details.name;
        if(details.email) order.customer_email = details.email;
        if(details.product) order.product = details.product;
        if(details.quantity) order.quantity = details.quantity;
        if(details.value) order.order_value = details.value;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order updated successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const deleteOrder = async (req, res) => {
    try {

        await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}