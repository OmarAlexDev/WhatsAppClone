import { createSlice } from "@reduxjs/toolkit";

const chatFilterSlice = createSlice({
    name:'chatFilter',
    initialState : '',
    reducers:{
        setChatFilter(state,action){
            return action.payload
        }
    }
}) 

export const chatFilterReducer = chatFilterSlice.reducer
export const {setChatFilter} = chatFilterSlice.actions