import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authAPI, userAPI} from "../../api/api";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

const initialState = {
    user: null,
    userId: null,
    roles: []
};

const authSlice = createSlice({
    initialState,
    name: 'authSlice',
    reducers: {
        logout: () => initialState,
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setTokenInfo: (state) => {
            const token = localStorage.getItem("accessToken")
            if (!token) return;
            const data = jwt_decode(token)
            const isTokenExpired =  Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000;
            if (isTokenExpired) {
                localStorage.removeItem("accessToken");
                return;
            }
            state.userId = data.id;
            const roles = data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.roles = Array.isArray(roles) ? roles : [roles];
        },
    }
});

export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            const token = await authAPI.login(data).then(response => response.data);
            localStorage.setItem("accessToken", token);
            thunkAPI.dispatch(authSlice.actions.setTokenInfo());

        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            const token = await authAPI.register(data).then(response => response.data.token);
            localStorage.setItem("accessToken", token);
            thunkAPI.dispatch(authSlice.actions.setTokenInfo());

        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await authAPI.logout();
            localStorage.removeItem("accessToken");
            thunkAPI.dispatch(authSlice.actions.logout());
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getUser = createAsyncThunk(
    "users/me",
    async (_,thunkAPI) => {
        try {
            const user = await userAPI.getMe().then(response => response.data);
            thunkAPI.dispatch(setUser(user));
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export default authSlice.reducer;

export const {setUser, setIsAuthorized, setTokenInfo} = authSlice.actions;