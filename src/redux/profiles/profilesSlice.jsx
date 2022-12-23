import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {profilesAPI, userAPI} from "../../api/api";

const initialState = {

};

const profilesSlice = createSlice({
    initialState,
    name: 'profilesSlice',
    reducers: {

    }
});

export const getProfilesData = createAsyncThunk(
    "getProfilesData",
    async (_, thunkAPI) => {
        try {
            return await profilesAPI.getProfiles().then(response => response.data);
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const patchProfileBan = createAsyncThunk(
    "patchProfileBan",
    async (data, thunkAPI) => {
        try {
            return await profilesAPI.patchProfileBan(data.id, data.data).then(response => response.data);
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);


export default profilesSlice.reducer;

export const {} = profilesSlice.actions;