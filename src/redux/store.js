import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import globalReducer from "./slices/globalSlice";
import authReducer from "./slices/authSlice";

let reducers = combineReducers({
    sidebar: globalReducer,
    auth: authReducer
});

const store = configureStore({
    reducer: reducers
})
window.store = store;

export default store;