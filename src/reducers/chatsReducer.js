import { createSlice } from "@reduxjs/toolkit";
import chatsService from "../services/chatsService";
import messageService from "../services/messageService";
import { setActiveChat } from "./activeChatReducer";

const chatsSlice = createSlice({
    name:"chats",
    initialState: [],
    reducers:{
        setChats(state,action){
            return action.payload
        },
        addNewChat(state,action){
            return state.concat(action.payload)
        },
        addMessageToChats(state,action){
            return state.map(c=>{
                if(c.id===action.payload.chatId){
                    const modifiedChat = c.messages.concat(action.payload.message)   
                    return {...c,messages:modifiedChat}
                }else{
                    return c
                }
            })
        },
        removeMessageFromChats(state,action){
            return state.map(c=>{
                if(c.id===action.payload.chatId){
                    const updatedMessages = c.messages.map(m=>{
                        if(m.id===action.payload.message.id){
                            return action.payload.message
                        }else{
                            return m
                        }
                    })
                    return {...c,messages:updatedMessages}
                }else{
                    return c
                }
            })
        }
    }
})

const initializeChats = (id)=>{
    return async dispatch=>{
        const response = await chatsService.get(id)
        return dispatch(setChats(response))
    }
}

const postMessage = (content,chatId)=>{
    return async dispatch =>{
        const response = await messageService.create(content)
        console.log(response)  
        if(chatId!==null){
            const chatObject ={
                chatId: chatId,
                message: response
            }
            dispatch(addMessageToChats(chatObject))
        }else{
            dispatch(addNewChat(response))
            dispatch(setActiveChat(response))
        }
    }
}

const deleteMessage = (id,chatId) =>{
    return async dispatch =>{
        const response = await messageService.remove(id)
        const chatObject = {
            chatId,
            message:response
        }
        dispatch(removeMessageFromChats(chatObject))
    }
}

export const chatsReducer = chatsSlice.reducer
export const {setChats, addMessageToChats, removeMessageFromChats, addNewChat} = chatsSlice.actions 
export {initializeChats,postMessage, deleteMessage}