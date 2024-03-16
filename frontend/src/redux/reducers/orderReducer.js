import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {}

const CreateOrderRequest = createAction('CreateOrderRequest');
const CreateOrderSuccess = createAction('CreateOrderSuccess');
const CreateOrderFailure = createAction('CreateOrderFailure');

const GetAllOrdersRequest = createAction('GetAllOrdersRequest');
const GetAllOrdersSuccess = createAction('GetAllOrdersSuccess');
const GetAllOrdersFailure = createAction('GetAllOrdersFailure');

const GetOrderRequest = createAction('GetOrderRequest');
const GetOrderSuccess = createAction('GetOrderSuccess');
const GetOrderFailure = createAction('GetOrderFailure');

const UpdateOrderRequest = createAction('UpdateOrderRequest');
const UpdateOrderSuccess = createAction('UpdateOrderSuccess');
const UpdateOrderFailure = createAction('UpdateOrderFailure');

const DeleteOrderRequest = createAction('DeleteOrderRequest');
const DeleteOrderSuccess = createAction('DeleteOrderSuccess');
const DeleteOrderFailure = createAction('DeleteOrderFailure');

const clearErrors = createAction('clearErrors');
const clearMessage = createAction('clearMessage');


export const createOrderReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(CreateOrderRequest, (state) => {
        state.loading = true;
    })
    .addCase(CreateOrderSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(CreateOrderFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const getAllOrdersReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(GetAllOrdersRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetAllOrdersSuccess, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
    })
    .addCase(GetAllOrdersFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const getOrderReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(GetOrderRequest, (state) => {
        state.loading = true;
    })
    .addCase(GetOrderSuccess, (state, action) => {
        state.loading = false;
        state.order = action.payload;
    })
    .addCase(GetOrderFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const updateOrderReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(UpdateOrderRequest, (state) => {
        state.loading = true;
    })
    .addCase(UpdateOrderSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(UpdateOrderFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})

export const deleteOrderReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(DeleteOrderRequest, (state) => {
        state.loading = true;
    })
    .addCase(DeleteOrderSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
    })
    .addCase(DeleteOrderFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
        state.error = null;
    })
    .addCase(clearMessage, (state) => {
        state.message = null;
    })
})