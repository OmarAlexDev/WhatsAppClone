import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { setCurrentSideElement } from "../reducers/sideBarReducer"
import { obtainUsers } from "../reducers/usersReducer";
import ContactLabel from "./ContactLabel";
import EmptySearch from "./EmptySearch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

const SideChatCreator = () => {

    const dispatch = useDispatch()
    const sideBar = useSelector(state=>state.sideBar)
    const currUser = useSelector(state=>state.currUser)
    const users = useSelector(state=>state.users)
    const [userFilter,setUserFilter] = React.useState('')

    const activeSide_style = {
        display: sideBar.type === "chatCreator" ? "" : "none"
    }

    React.useEffect(()=>{
        dispatch(obtainUsers())
    },[])

    function returnChatsMenu(){
        dispatch(setCurrentSideElement(null))
    }

    const usersToShow = users.filter(u=>u.username.includes(userFilter)).map((u,index)=>{
        return u.id!==currUser.id ? <ContactLabel key={index} data={u}/> : null
    })

    return(
        <div id="sideChatCreator" style={activeSide_style}>
            <div className="nav side">
                <span className="arrow-icon" onClick={returnChatsMenu}>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" x="0px" y="0px" >
                        <path fill="currentColor" d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"></path>
                    </svg>
                </span>
                <h1>Nuevo Chat</h1>
            </div>
            <div id="search">
                <div className="search-bar side">
                    <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass}/>
                    <input placeholder='Busca contactos' value={userFilter} onChange={(e)=>setUserFilter(e.target.value)}/>
                </div>
            </div>
            {usersToShow.length>0 ?
                <div className="contact-list">
                    <div className="chat-label">
                        <div className="chat-label-content side">
                            CONTACTOS EN WHATSAPP
                        </div>
                    </div>
                    {usersToShow}
                </div> 
                : 
                <EmptySearch content={`No se encontraron resultados para ${userFilter}`}/>
            }
        </div>
    )
}

export default SideChatCreator