import { configureStore } from '@reduxjs/toolkit'
import { createOrderReducer, deleteOrderReducer, getAllOrdersReducer, getOrderReducer, updateOrderReducer } from './reducers/orderReducer'


const store = configureStore({
    reducer: {
        createOrder: createOrderReducer,
        getAllOrders: getAllOrdersReducer,
        getOrder: getOrderReducer,
        updateOrder: updateOrderReducer,
        deleteOrder: deleteOrderReducer
    }
})

export default store;