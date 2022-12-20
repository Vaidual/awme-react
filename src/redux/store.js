import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import globalReducer from "./slices/globalSlice";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";

let reducers = combineReducers({
    sidebar: globalReducer,
    auth: authReducer,
    users: usersReducer
});

const store = configureStore({
    reducer: reducers
})
window.store = store;

export default store;