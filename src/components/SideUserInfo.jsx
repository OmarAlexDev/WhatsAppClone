import React from "react"
import { setCurrentSideElement } from "../reducers/sideBarReducer"
import { setActiveChat } from "../reducers/activeChatReducer"
import { setCurrentUser, updateCurrentUser} from "../reducers/currentUserReducer"
import { setChats } from "../reducers/chatsReducer"
import { setUsers } from "../reducers/usersReducer"
import { useSelector, useDispatch } from "react-redux"
import {useNavigate} from 'react-router-dom'
import { SocketContext } from "../context/socket"

const SideUserInfo = () =>{
    const navigate = useNavigate()
    const socket = React.useContext(SocketContext)
    const dispatch = useDispatch()
    const sideBar = useSelector(state=>state.sideBar)
    const users = useSelector(state=>state.users)
    const currUser = useSelector(state=>state.currUser)
    const [usernameIsEditable, setUsernameIsEditable] = React.useState(false)
    const [stateIsEditable, setStateIsEditable] = React.useState(false)
    const [tempUser, setTempUsername] = React.useState(
                                                        {   
                                                            username:currUser.username,
                                                            profileImage: currUser.profileImage,
                                                            state: currUser.state,
                                                            id: currUser.id
                                                        })

    const activeSide_style = {
        display: sideBar.type === "userInfo" ? "" : "none"
    }

    function ReturnChatsMenu(){
        dispatch(setCurrentSideElement(null))
    }

    function LogOut(){
        window.localStorage.removeItem('loggedWAUser');
        dispatch(setActiveChat(null))
        dispatch(setCurrentUser(null))
        dispatch(setChats([]))
        dispatch(setCurrentSideElement(null))
        dispatch(setUsers([]))
        navigate('/login')
    }

    function UpdateUser(target){
        target === 'state' ?  setStateIsEditable(false) : setUsernameIsEditable(false)
        if(tempUser.username!==currUser.username || tempUser.state!==currUser.state || tempUser.profileImage!==currUser.profileImage){
            if(tempUser.username!==currUser.username && users.find(u=>u.username===tempUser.username)){
                console.log('Username already in use')   
            }else{
                dispatch(updateCurrentUser(tempUser))
                    .then(res=>{
                        if(res && res.response.data.error){
                            console.log(res.response.data.error)
                        }else{
                            socket.emit('client-update',{id: currUser.id})
                        }
                    })
            }  
        }else{
            //No change submitted
            setTempUsername(prev=>{ return {...prev, username: currUser.username, state: currUser.state, profileImage: currUser.profileImage}})
        }
    }

    return(
        <div id="sideUserInfo" style={activeSide_style}>
            <div className="nav side">         
                <span className="arrow-icon" onClick={ReturnChatsMenu}>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" x="0px" y="0px" >
                        <path fill="currentColor" d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"></path>
                    </svg>
                </span>
                <h1>Perfil</h1>
            </div> 
            <div className="sideUserInfo-content">
                <div className="sideUserInfo-content-image">
                    <span className="sideUserInfo-content-image-icon">
                        <svg viewBox="0 0 212 212" preserveAspectRatio="xMidYMid meet">
                            <path fill="#DFE5E7" d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z"></path>
                            <g>
                                <path fill="#FFFFFF" d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z"></path>
                                <path fill="#FFFFFF" d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z"></path>
                            </g>
                        </svg>
                    </span>
                </div>
                <div className="sideUserInfo-content-label">
                    <span>Tu nombre</span>
                    {
                        usernameIsEditable===false ?
                        <div className="toggle-data">
                            <span className="toggle-data-label">{currUser.username}</span>
                            <span className="toggle-data-icon" onClick={()=>setUsernameIsEditable(true)}>
                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" enableBackground="new 0 0 24 24" xmlSpace="preserve">
                                    <path fill="currentColor" d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"></path>
                                </svg>
                            </span>
                        </div>
                        :
                        <div className="toggle-data active">
                            <span className="toggle-data-label">
                                <input value={tempUser.username} onChange={(e)=>setTempUsername(prev=>{ return {...prev, username: e.target.value}})}/>
                            </span>
                            <span className="toggle-data-icon" onClick={()=>UpdateUser('username')}>
                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" enableBackground="new 0 0 24 24" xmlSpace="preserve">
                                    <path fill="currentColor" d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"></path>
                                </svg>
                            </span>
                        </div>
                    } 
                </div>
                <div className="sideUserInfo-content-empty-label">
                    Este nombre será visible para tus contactos de WhatsApp.
                </div>
                <div className="sideUserInfo-content-label">
                    <span>Info.</span>
                    {
                        stateIsEditable===false ?
                        <div className="toggle-data">
                            <span className="toggle-data-label">{currUser.state}</span>
                            <span className="toggle-data-icon" onClick={()=>setStateIsEditable(true)}>
                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" enableBackground="new 0 0 24 24" xmlSpace="preserve">
                                    <path fill="currentColor" d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"></path>
                                </svg>
                            </span>
                        </div>
                        :
                        <div className="toggle-data active">
                            <span className="toggle-data-label">
                                <input value={tempUser.state} onChange={(e)=>setTempUsername(prev=>{ return {...prev, state: e.target.value}})}/>
                            </span>
                            <span className="toggle-data-icon" onClick={()=>UpdateUser('state')}>
                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" enableBackground="new 0 0 24 24" xmlSpace="preserve">
                                    <path fill="currentColor" d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"></path>
                                </svg>
                            </span>
                        </div>
                    } 
                </div>
            </div>
            <div className="sideChatInfoOptions logout" onClick={LogOut}>
                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" enableBackground="new 0 0 24 24" xmlSpace="preserve">
                    <path fill="currentColor" d="M16.6,8.1l1.2-1.2l5.1,5.1l-5.1,5.1l-1.2-1.2l3-3H8.7v-1.8h10.9L16.6,8.1z M3.8,19.9h9.1 c1,0,1.8-0.8,1.8-1.8v-1.4h-1.8v1.4H3.8V5.8h9.1v1.4h1.8V5.8c0-1-0.8-1.8-1.8-1.8H3.8C2.8,4,2,4.8,2,5.8v12.4 C2,19.1,2.8,19.9,3.8,19.9z"></path>
                </svg>
                Cerrar sesión
            </div>
        </div>
    )
}

export default  SideUserInfo