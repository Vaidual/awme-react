import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import globalReducer from "./global/globalSlice";
import authReducer from "./auth/authSlice";
import usersReducer from "./users/usersSlice";
import collarsReducer from "./collars/collarsSlice";
import profilesReducer from "./profiles/profilesSlice";

let reducers = combineReducers({
    global: globalReducer,
    auth: authReducer,
    users: usersReducer,
    collars: collarsReducer,
    profiles: profilesReducer,
});

const store = configureStore({
    reducer: reducers
})
window.store = store;

export default store;