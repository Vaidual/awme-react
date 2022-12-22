import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authAPI, collarAPI, userAPI} from "../../api/api";

const initialState = {
    collars: []
};

const collarsSlice = createSlice({
    initialState,
    name: 'collarsSlice',
    reducers: {

    }
});

export const getCollarsData = createAsyncThunk(
    "collars",
    async (_, thunkAPI) => {
        try {
            return await collarAPI.getCollars().then(response => response.data);
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteCollar = createAsyncThunk(
    "collars/delete",
    async (id, thunkAPI) => {
        try {
            return await collarAPI.deleteCollar(id).then(response => response.data);
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const postCollar = createAsyncThunk(
    "collars/post",
    async (data, thunkAPI) => {
        try {
            return await collarAPI.postCollar(data).then(response => response.data);
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export default collarsSlice.reducer;

export const {} = collarsSlice.actions;