import {configureStore} from '@reduxjs/toolkit'
import { activeChatReducer } from './reducers/activeChatReducer'
import { currUserReducer } from './reducers/currentUserReducer'
import { chatsReducer } from './reducers/chatsReducer'

const store = configureStore({
    reducer:{
        activeChat: activeChatReducer,
        currUser: currUserReducer,
        chats: chatsReducer
    }
})

export default store