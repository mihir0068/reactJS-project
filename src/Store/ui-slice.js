import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name:'ui',
    initialState:{userDetailsVisible:true},
    reducers:{
        toggle(state){
            state.userDetailsVisible= !state.userDetailsVisible;
        }
    }
});
export const uiAction = uiSlice.actions;
export default uiSlice;