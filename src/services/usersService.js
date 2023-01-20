import axios from 'axios'
import tokenService from './tokenService'
import { paths } from '../constants'

const getAll = async ()=>{
    const response = await axios.get(paths.USERS)
    return response.data
}

const get = async (id)=>{
    const response = await axios.get(`${paths.USERS}/${id}`)
    return response.data
}

const post = async (content)=>{
    const response = await axios.post(paths.USERS, content)
    return response.data
}

const put = async (content)=>{
    const config = {headers: {Authorization: tokenService.getToken()}}
    const response = await axios.put(`${paths.USERS}/${content.id}`, content, config)
    return response.data
}

export default {getAll, post, put, get}