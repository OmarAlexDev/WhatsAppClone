import axios from 'axios'
import { paths } from '../constants'

const post = async (content)=>{
    const response = await axios.post(paths.LOGIN,content)
    return response.data
}

export default {post}