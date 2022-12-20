import axios from 'axios'
import chatsService from './chatsService'

const base_url = "http://localhost:3001/MINKAN/api/messages"

const create = async (content)=>{
    const config = {headers: {Authorization: chatsService.getToken()}}
    const response = await axios.post(base_url,content,config)
    return response.data
}

const remove = async(id)=>{
    const config = {headers: {Authorization: chatsService.getToken()}}
    const response = await axios.delete(`${base_url}/${id}`,config)
    return response.data
}

export default {create,remove}