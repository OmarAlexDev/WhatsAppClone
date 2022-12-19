import React from "react"
import { useSelector } from "react-redux"
import chatsService from "../services/chatsService"

const MessageGenerator = (props)=>{
    const currUser = useSelector(state=>state.currUser)
    const [message,setMessage] = React.useState('')

    const sendStyle={
        color: message!== '' ? "black" : "#8696a0",
        cursor: message!== '' ? "pointer" : ""
    }

    function postMessage(){
        const newMsg = {
            content: message,
            time: new Date(),
            remittent:currUser,
            destinatary:"2",
            active: true
        }
        chatsService.create(newMsg)
            .then((res)=>{
                props.addMessage(res)
                setMessage('')
            })
            .catch(err=>console.log(err))
    }

    return(
        <div className="active-chat-bottom">
            <div className="active-chat-bottom-textbar">
                <input value={message} onChange={(event)=>{setMessage(event.target.value)}}/>
            </div>
            <span style={sendStyle} onClick={postMessage}>
                <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px">
                    <path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path>
                </svg>
            </span>
        </div>
    )
}

export default MessageGenerator