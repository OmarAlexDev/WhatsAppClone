import axios from 'axios'
import tokenService from './tokenService'
import { paths } from '../constants'

const create = async (content)=>{
    const config = {headers: {Authorization: tokenService.getToken()}}
    const response = await axios.post(paths.MESSAGES,content,config)
    return response.data
}

const remove = async(id)=>{
    const config = {headers: {Authorization: tokenService.getToken()}}
    const response = await axios.delete(`${paths.MESSAGES}/${id}`,config)
    return response.data
}

export default {create,remove}