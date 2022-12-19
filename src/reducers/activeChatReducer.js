import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const chatSlice = createSlice({
    name: 'activeChat',
    initialState,
    reducers:{
        setActiveChat(state,action){
            return action.payload
        }
    }
})

export const activeChatReducer = chatSlice.reducer
export  const {setActiveChat} = chatSlice.actions