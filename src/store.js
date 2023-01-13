import {configureStore} from '@reduxjs/toolkit'
import { activeChatReducer } from './reducers/activeChatReducer'
import { currUserReducer } from './reducers/currentUserReducer'
import { chatsReducer } from './reducers/chatsReducer'
import { sideBarReducer } from './reducers/sideBarReducer'
import { userReducer } from './reducers/usersReducer'
import { filterReducer } from './reducers/filterReducer'

const store = configureStore({
    reducer:{
        activeChat: activeChatReducer,
        currUser: currUserReducer,
        chats: chatsReducer,
        users: userReducer,
        sideBar: sideBarReducer,
        filters: filterReducer
    }
})

export default store