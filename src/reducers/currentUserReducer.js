import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/usersService";
import tokenService from "../services/tokenService";
import { updateUsers } from "./usersReducer";

const initialState = null

const currUserSlice = createSlice({
    name:"currentUser",
    initialState,
    reducers:{
        setCurrentUser(state,action){
            return action.payload
        }
    }
})

const updateUserInDb = (content)=>{
    return async dispatch=>{
        try{
            const response = await usersService.put(content)
            const parsedUser = JSON.stringify(response)
            window.localStorage.setItem('loggedWAUser',parsedUser)
            tokenService.setToken(response.token)
            dispatch(setCurrentUser(response))
            dispatch(updateUsers({
                state: response.state,
                profileImage: response.profileImage,
                username: response.username,
                id: response.id
            }))
        }catch(err){
            console.log(err)
        }
    }
}


export const currUserReducer = currUserSlice.reducer
export const {setCurrentUser} = currUserSlice.actions
export {updateUserInDb}