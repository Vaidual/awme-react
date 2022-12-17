import {createAction, createReducer, createSlice} from "@reduxjs/toolkit";

let initialState = {
    languages: [{key: "ua", name: "Українська"}, {key: "en", name: "English"}],
    // selectedLanguage: "ua"
};

const setStatus = (lang) => ({type: 'SET_CUR_LANG', payload: lang})

const globalSlicer = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLanguage: (state, setStatus) => {
            state.selectedLanguage = setStatus.payload;
        }
    }
})

// const globalReducer = createReducer(initialState,
//     (builder) => {
//         builder
//             .addCase(createAction('SET_CUR_LANG', setStatus), (state, action) => {
//                 state.selectedLanguage = action.payload.lang;
//             })
//             .addDefaultCase(() => {
//             })
//     });

export const { setLanguage } = globalSlicer.actions

export default globalSlicer.reducer;