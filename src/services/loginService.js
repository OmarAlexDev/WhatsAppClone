import axios from 'axios'

const base_url="http://localhost:3001/MINKAN/api/login"

const post = async (content)=>{
    const response = await axios.post(base_url,content)
    return response.data
}

export default {post}