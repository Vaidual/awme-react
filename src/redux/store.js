import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import globalReducer from "./global/globalSlice";
import authReducer from "./auth/authSlice";
import usersReducer from "./users/usersSlice";
import collarsReducer from "./collars/collarsSlice";

let reducers = combineReducers({
    global: globalReducer,
    auth: authReducer,
    users: usersReducer,
    collars: collarsReducer,
});

const store = configureStore({
    reducer: reducers
})
window.store = store;

export default store;