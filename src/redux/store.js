import {combineReducers} from "redux";
import globalReducer from "./reducers/global-reducer";
import {configureStore} from "@reduxjs/toolkit";
import globalSlicer from "./reducers/global-reducer";

let reducers = combineReducers({
    sidebar: globalSlicer,
});

const store = configureStore({
    reducer: reducers
})
window.store = store;

export default store;