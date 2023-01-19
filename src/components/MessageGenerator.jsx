import React from "react"
import { useSelector, useDispatch} from "react-redux"
import { postMessage } from "../reducers/chatsReducer"
import { SocketContext } from "../context/socket"

const MessageGenerator = (props)=>{
    const socket = React.useContext(SocketContext)
    const dispatch = useDispatch()
    const {currDestinatary} = props
    const activeChat = useSelector(state=>state.activeChat)
    const currUser = useSelector(state=>state.currUser)
    const [message,setMessage] = React.useState('')

    const sendStyle={
        color: message!== '' ? "black" : "#8696a0",
        cursor: message!== '' ? "pointer" : ""
    }

    function createMessage(){
        const newMsg = {
            content: message,
            remittent:currUser.id,
            destinatary:currDestinatary.id
        }
        dispatch(postMessage(newMsg, activeChat.id || null))
            .then((res)=>{
                if(res && res.response.data.error){
                    console.log(res.response.data.error)
                }else{
                    socket.emit('client-push-message',{destinatary: currDestinatary.id,  remittent: currUser.id})
                    setMessage('')
                }
            })

    }

    return(
        <div className="active-chat-bottom">
            <div className="active-chat-bottom-textbar">
                <input placeholder="Escribe un mensaje aqui" value={message} onChange={(event)=>{setMessage(event.target.value)}}/>
            </div>
            <span style={sendStyle} onClick={createMessage}>
                <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px">
                    <path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path>
                </svg>
            </span>
        </div>
    )
}

export default MessageGenerator