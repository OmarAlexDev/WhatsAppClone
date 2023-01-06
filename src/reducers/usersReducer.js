import {createSlice} from '@reduxjs/toolkit'
import usersService from '../services/usersService'

const userSlice = createSlice({
    name:"users",
    initialState : [] ,
    reducers : {
        setUsers(state,action){
            return action.payload
        }
    }
})

const obtainUsers = ()=>{
    return async dispatch=>{
        const response = await usersService.get()
        dispatch(setUsers(response))
    }
}

export const userReducer = userSlice.reducer
export const {setUsers} = userSlice.actions
export {obtainUsers} 