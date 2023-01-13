import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    chatFilter:'',
    userFilter:'',
    messageFilter:''
}

const filterSlice = createSlice({
    name:'filters',
    initialState,
    reducers:{
        setChatFilter(state,action){
            return {
                ...state,
                chatFilter:action.payload
            }
        },
        setUserFilter(state,action){
            return {
                ...state,
                userFilter:action.payload
            }
        },
        setMessageFilter(state,action){
            return {
                ...state,
                messageFilter:action.payload
            }
        }
    }
}) 

export const filterReducer = filterSlice.reducer
export const {setChatFilter, setUserFilter, setMessageFilter} = filterSlice.actions