import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    languages: [{key: "ua", name: "Українська"}, {key: "en", name: "English"}],
    // selectedLanguage: "ua"
};

const globalSlicer = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLanguage: (state, setStatus) => {
            state.selectedLanguage = setStatus.payload;
        }
    }
})

export const { setLanguage } = globalSlicer.actions

export default globalSlicer.reducer;