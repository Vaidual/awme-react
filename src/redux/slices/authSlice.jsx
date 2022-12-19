import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authAPI, userAPI} from "../../api/api";
import {useNavigate} from "react-router-dom";

const initialState = {
    user: null
};


const authSlice = createSlice({
    initialState,
    name: 'authSlice',
    reducers: {
        logout: () => initialState,
        setUser: (state, action) => {
            state.user = action.payload;
            console.log(state.user);
        }
    }
});

export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            const response = await authAPI.login(data);
            return { user: data };
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

export const login = (data) => (dispatch) => {
    console.log(11)
    const navigate = useNavigate();
    authAPI.login(data)
        .then(response => {
            console.log(11)
            dispatch(getMe())
            navigate("/");
        })
        .catch(error => {
            console.log(11)
            return error;
        });
}

export const getMe = () => (dispatch) => {

    userAPI.getMe()
        .then(response => {
            dispatch(setMe())
        })
        .catch(error => {
            return Promise.resolve({error: error.response ? error.response.data : error.message});
        });
}
export const setMe = (user) => (dispatch) => {
    dispatch(setUser(user));
}


export default authSlice.reducer;

export const {logout, setUser, setIsAuthorized} = authSlice.actions;