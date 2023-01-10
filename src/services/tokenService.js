let token = null

const setToken = (tkn)=>{
    token = `bearer ${tkn}`
}

const getToken = ()=>{
    return token
}

export default {setToken,getToken}