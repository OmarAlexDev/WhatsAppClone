import axios from 'axios'
import tokenService from './tokenService'
import { paths } from '../constants'

const get = async (id, otherId)=>{
    let response
    const config = {headers: {Authorization: tokenService.getToken()}}
    if(!otherId){
        response = await axios.get(`${paths.CHATS}/fromUser/${id}`, config)
    }else{
        response = await axios.get(`${paths.CHATS}/fromUser/${id}/byUser/${otherId}`, config)
    }
    return response.data
}

const remove = async (id)=>{
    const config = {headers: {Authorization: tokenService.getToken()}}
    const response = await axios.delete(`${paths.CHATS}/${id}`, config)
    return response.data
}

export default {get,remove}