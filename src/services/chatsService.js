import axios from 'axios'

const base_url="http://localhost:3001/MINKAN/api/chats"

let token = null

const setToken = (tkn)=>{
    token = `bearer ${tkn}`
}

const getToken = ()=>{
    return token
}

const get = async (id)=>{
    const config = {headers: {Authorization: token}}
    const response = await axios.get(`${base_url}/byUser/${id}`, config)
    return response.data
}

const remove = async (id)=>{
    const config = {headers: {Authorization: token}}
    const response = await axios.delete(`${base_url}/${id}`, config)
    return response.data
}

export default {get,remove,setToken,getToken}