import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
    name:"sideBar",
    initialState: null,
    reducers:{
        setCurrentSideElement(state,action){
            return action.payload
        }
    }
})

export const {setCurrentSideElement} = sideBarSlice.actions
export const sideBarReducer = sideBarSlice.reducer