import {createSlice} from '@reduxjs/toolkit'
import usersService from '../services/usersService'
import { updateUserFromChats } from './chatsReducer'

const userSlice = createSlice({
    name:"users",
    initialState : [] ,
    reducers : {
        setUsers(state,action){
            return action.payload
        },
        updateUsers(state,action){
            return state.map(u=>{
                if(u.id===action.payload.id){
                    return {
                        ...u,
                        state: action.payload.state,
                        profileImage: action.payload.profileImage,
                        username: action.payload.username
                    }
                }
                return u
            })
        }
    }
})

const obtainUsers = ()=>{
    return async dispatch=>{
        try{
            const response = await usersService.getAll()
            dispatch(setUsers(response))
        }catch(err){
            return err
        }    
    }
}

const obtainUser = (id)=>{
    return async dispatch=>{
        try{
            const response = await usersService.get(id)
            dispatch(updateUsers(response))
            dispatch(updateUserFromChats(response))
        }catch(err){
            return err
        }
    }
}

export const userReducer = userSlice.reducer
export const {setUsers, updateUsers} = userSlice.actions
export {obtainUsers, obtainUser} 