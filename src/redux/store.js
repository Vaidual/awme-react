import {combineReducers} from "redux";
import globalReducer from "./slices/globalSlice";
import {configureStore} from "@reduxjs/toolkit";
import globalSlicer from "./slices/globalSlice";
import userSlicer from "./slices/userSlice";

let reducers = combineReducers({
    sidebar: globalSlicer,
    user: userSlicer
});

const store = configureStore({
    reducer: reducers
})
window.store = store;

export default store;