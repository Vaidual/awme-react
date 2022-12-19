import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        logout: () => initialState,
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;