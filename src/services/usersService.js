import axios from 'axios'

const base_url = "http://localhost:3001/MINKAN/api/users"

const get = async ()=>{
    const response = await axios.get(base_url)
    return response.data
}

export default {get}