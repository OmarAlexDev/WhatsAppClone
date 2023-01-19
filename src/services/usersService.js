import axios from 'axios'
import tokenService from './tokenService'

//const base_url = "http://localhost:3001/MINKAN/api/users"
const base_url="/MINKAN/api/users"

const getAll = async ()=>{
    const response = await axios.get(base_url)
    return response.data
}

const get = async (id)=>{
    const response = await axios.get(`${base_url}/${id}`)
    return response.data
}

const post = async (content)=>{
    const response = await axios.post(base_url, content)
    return response.data
}

const put = async (content)=>{
    const config = {headers: {Authorization: tokenService.getToken()}}
    const response = await axios.put(`${base_url}/${content.id}`, content, config)
    return response.data
}

export default {getAll, post, put, get}