import { createSlice } from "@reduxjs/toolkit";
import messageService from "../services/messageService";
import { addMessageToChats } from "./chatsReducer";

const initialState = null

const chatSlice = createSlice({
    name: 'activeChat',
    initialState,
    reducers:{
        setActiveChat(state,action){
            return action.payload
        },
    }
})

export const activeChatReducer = chatSlice.reducer
export const {setActiveChat} = chatSlice.actions