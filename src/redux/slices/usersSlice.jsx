import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {userAPI} from "../../api/api";

const initialState = {
    users: []
};

const usersSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {

    }
});

export const getUsersData = createAsyncThunk(
    "users",
    async (_, thunkAPI) => {
        try {
            return await userAPI.getUsers().then(response => response.data);
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export default usersSlice.reducer;

export const {} = usersSlice.actions;