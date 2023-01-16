import axios from 'axios'
import tokenService from './tokenService'

//const base_url = "http://localhost:3001/MINKAN/api/users"
const base_url="/MINKAN/api/users"

const get = async ()=>{
    const response = await axios.get(base_url)
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

export default {get, post, put}