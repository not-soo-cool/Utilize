import axios from "axios"

const serverUrl = "http://localhost:2000/api/v1/orders"


export const createOrder = (id, customer_name, customer_email, product, quantity, order_value) => async(dispatch) => {
    try {
        dispatch({
            type: "CreateOrderRequest",
        });

        const {data} = await axios.post(`${serverUrl}/create`, {id, customer_name, customer_email, product, quantity, order_value}, {
            withCredentials: true,
        });

        dispatch({
            type: "CreateOrderSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "CreateOrderFailure",
            payload: error.response.data.message
        })
    }
}

export const getAllOrders = () => async(dispatch) => {
    try {
        dispatch({
            type: "GetAllOrdersRequest",
        });

        const {data} = await axios.get(`${serverUrl}/get/all`, {
            withCredentials: true,
        });

        dispatch({
            type: "GetAllOrdersSuccess",
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: "GetAllOrdersFailure",
            payload: error.response.data.message
        })
    }
}

export const getOrder = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "GetOrderRequest",
        });

        const {data} = await axios.get(`${serverUrl}/get/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "GetOrderSuccess",
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: "GetOrderFailure",
            payload: error.response.data.message
        })
    }
}

export const updateOrder = (id, details) => async(dispatch) => {
    try {
        dispatch({
            type: "UpdateOrderRequest",
        });

        const {data} = await axios.put(`${serverUrl}/update/${id}`, {details}, {
            withCredentials: true,
        });

        dispatch({
            type: "UpdateOrderSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "UpdateOrderFailure",
            payload: error.response.data.message
        })
    }
}

export const deleteOrder = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "DeleteOrderRequest",
        });

        const {data} = await axios.delete(`${serverUrl}/delete/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "DeleteOrderSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "DeleteOrderFailure",
            payload: error.response.data.message
        })
    }
}