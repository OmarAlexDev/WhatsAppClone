import axios from 'axios'
import tokenService from './tokenService'

//const base_url="http://localhost:3001/MINKAN/api/chats"
const base_url="/MINKAN/api/chats"

const get = async (id)=>{
    const config = {headers: {Authorization: tokenService.getToken()}}
    const response = await axios.get(`${base_url}/byUser/${id}`, config)
    return response.data
}

const remove = async (id)=>{
    const config = {headers: {Authorization: tokenService.getToken()}}
    const response = await axios.delete(`${base_url}/${id}`, config)
    return response.data
}

export default {get,remove}