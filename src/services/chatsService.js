import axios from 'axios'

const base_url="http://localhost:3001/messages"

const get = async ()=>{
    const response = await axios.get(base_url)
    return response.data
}

const create = async (content)=>{
    const response = await axios.post(base_url,content)
    return response.data
}

const remove = async(id,msg)=>{
    const deletionMsg = {
        ...msg,
        active:false,
        content: "Se eliminó este mensaje"
    }
    const response = await axios.put(`${base_url}/${id}`,deletionMsg)
    return response.data
}

export default {get,create,remove}