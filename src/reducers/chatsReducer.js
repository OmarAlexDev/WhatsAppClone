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
        updateChats(state,action){
            if(state.find(c=>c.id===action.payload.id)){
                return state.map(c=>{
                    if(c.id===action.payload.id){
                        return action.payload
                    }
                    return c
                })
            }else{
                return state.concat(action.payload)
            }
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
        },
        removeChatFromChats(state,action){
            return state.filter(c=>c.id!==action.payload)
        },
        updateUserFromChats(state,action){
            return state.map(c=>{
                if(c.user1.id===action.payload.id){
                    return {...c, user1: action.payload}
                }else if(c.user2.id===action.payload.id){
                    return {...c, user1: action.payload}
                }
                return c
            })
        }
    }
})

const initializeChats = (id)=>{
    return async dispatch=>{
        try{
            const response = await chatsService.get(id)
            return dispatch(setChats(response))
        }catch(err){
            return err
        }
    }
}

const deleteChat = (chatId) => {
    return async dispatch=>{
        try{
            await chatsService.remove(chatId)
            dispatch(removeChatFromChats(chatId))
        }catch(err){
            return err
        }
    } 
}

const updateChat = (id, otherId) =>{
    return async dispatch=>{
        try{
            const response = await chatsService.get(id, otherId)
            dispatch(updateChats(response))
        }catch(err){
            return err
        }
    }
}

const postMessage = (content,chatId)=>{
    return async dispatch =>{
        try{
            const response = await messageService.create(content)  
            if(chatId!==null){
                const chatObject ={
                    chatId: chatId,
                    message: response
                }
                dispatch(addMessageToChats(chatObject))
            }else{
                dispatch(updateChats(response))
                dispatch(setActiveChat(response))
            }
        }catch(err){
            return err
        }
    }
}

const deleteMessage = (id,chatId) =>{
    return async dispatch =>{
        try{
            const response = await messageService.remove(id)
            const chatObject = {
                chatId,
                message:response
            }
            dispatch(removeMessageFromChats(chatObject))
        }catch(err){
            return err
        }
    }
}

export const chatsReducer = chatsSlice.reducer
export const {setChats, addMessageToChats, removeMessageFromChats, removeChatFromChats, updateChats, updateUserFromChats} = chatsSlice.actions 
export {initializeChats,postMessage, deleteMessage, deleteChat, updateChat}