import {configureStore} from '@reduxjs/toolkit'
import { activeChatReducer } from './reducers/activeChatReducer'
import { currUserReducer } from './reducers/currentUserReducer'

const store = configureStore({
    reducer:{
        activeChat: activeChatReducer,
        currUser: currUserReducer
    }
})

export default store