import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux"
import {nanoid} from "nanoid"
import Message from "./Message"
import MessageGenerator from "./MessageGenerator"
import { ScrollMessages, ScrollScreen} from "../functions/Scroll"
import { setMessageFilter } from "../reducers/filterReducer"

const Chat = ()=>{
    const dispatch = useDispatch()
    const [activeSearch, setActiveSearch] = React.useState(false)
    const [scrollIndex, setScrollIndex] = React.useState(-1)
    const activeChat = useSelector(state=>state.activeChat)
    const currUser = useSelector(state=>state.currUser)
    const messageFilter = useSelector(state=>state.filters.messageFilter)
    let currDestinatary = null
    let messages_to_show = null
    let time= null
    let prettyTime = null 
    let selfMessages = null
    let filteredMessages = []

    const styles={
        backgroundColor : "#f0f2f5"
    }

    if(activeChat!==null){
        currDestinatary = currUser.id!==activeChat.user1.id ? activeChat.user1 : activeChat.user2
        selfMessages = activeChat.messages.length>0 ? activeChat.messages.filter(m=>m.remittent!==currUser.id) : null
        time = selfMessages!==null && selfMessages.length>0 ? new Date(selfMessages[selfMessages.length-1].time) : null
        prettyTime = time!==null ? `${time.getHours()}:${time.getMinutes()}` : null

        activeChat.messages.forEach((m,curr)=>{   
            if(messageFilter !== '' && m.content.includes(messageFilter) && m.content!=="Se eliminó este mensaje"){
                filteredMessages.push(curr)
            }
        })
        filteredMessages.reverse()

        messages_to_show = activeChat.messages.map((m,curr)=>{
            let isPrimary = m.remittent===currUser.id ? true : false
            return <div id={`message-${curr}`} key={nanoid()} className="message-row">
                        <Message key={curr} primary={isPrimary} data={m} currDestinatary={currDestinatary}/>
                    </div>
        }).reverse()
    }

    function skipMessage(value){ 
        if(scrollIndex+value>-1 && scrollIndex+value<filteredMessages.length){     
            setScrollIndex(prev=>prev+value)      
        }
    }

    React.useEffect(()=>{
        if(filteredMessages.length>0){
            ScrollMessages(filteredMessages[scrollIndex],true)
        }
    },[scrollIndex])

    return(
        <div id="chat" style={styles}>
            {activeChat!==null ?
                <div className="active-chat">
                    <div className="active-chat-head">
                        <div className="active-chat-head-user">
                            <span className="arrow-icon mobile" onClick={()=>ScrollScreen("sidebar")}>
                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" x="0px" y="0px" >
                                    <path fill="currentColor" d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"></path>
                                </svg>
                            </span>
                            { activeSearch===false ?
                                <>
                                    <svg viewBox="0 0 212 212" preserveAspectRatio="xMidYMid meet">
                                        <path fill="#DFE5E7" d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z"></path>
                                        <g>
                                            <path fill="#FFFFFF" d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z"></path>
                                            <path fill="#FFFFFF" d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z"></path>
                                        </g>
                                    </svg>
                                    <div className="active-chat-head-info">
                                        <span className="firstEl">
                                            {currDestinatary.username}
                                        </span>
                                        <span className="secondEl">
                                            {prettyTime ? `últ. vez hoy a la(s) ${prettyTime}` : `Disponible`}
                                        </span>
                                    </div>
                                </>
                                :
                                <>
                                    <input autoFocus value={messageFilter} onChange={(e)=>dispatch(setMessageFilter(e.target.value))}/>
                                    <span className="arrow-icon up" onClick={()=>skipMessage(1)}>
                                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" x="0px" y="0px" >
                                            <path fill="currentColor" d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"></path>
                                        </svg>
                                    </span>
                                    <span className="arrow-icon down" onClick={()=>skipMessage(-1)}>
                                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" x="0px" y="0px" >
                                            <path fill="currentColor" d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"></path>
                                        </svg>
                                    </span>
                                </>
                            }
                        </div>
                        <div className="active-chat-head-search"> 
                            { activeSearch===false ?
                                <FontAwesomeIcon className='active-chat-head-search-icon' onClick={()=>setActiveSearch(true)} icon={faMagnifyingGlass}/>
                                :
                                <FontAwesomeIcon className='active-chat-head-search-icon' onClick={()=>setActiveSearch(false)} icon={faXmark}/>
                            }           
                        </div>
                    </div>
                    <div className="active-chat-body">
                            {messages_to_show}
                            <div className="top-scroller" onClick={()=>ScrollMessages(activeChat.messages.length-1,false)}>
                                <svg viewBox="0 0 19 20" height="20" width="20" preserveAspectRatio="xMidYMid meet" x="0px" y="0px" xmlSpace="preserve">
                                    <path fill="currentColor" d="M3.8,6.7l5.7,5.7l5.7-5.7l1.6,1.6l-7.3,7.2L2.2,8.3L3.8,6.7z"></path>
                                    </svg>
                            </div>
                    </div>
                    <MessageGenerator currDestinatary={currDestinatary}/>
                </div> :
                <div className="empty-chat">
                    <svg className="empty-chat-img" viewBox="0 0 303 172" width="360" preserveAspectRatio="xMidYMid meet" fill="none">
                        <path d="M229.565 160.229C262.212 149.245 286.931 118.241 283.39 73.4194C278.009 5.31929 212.365 -11.5738 171.472 8.48673C115.998 35.6999 108.972 40.1612 69.2388 40.1612C39.645 40.1612 9.51318 54.4147 5.7467 92.952C3.0166 120.885 13.9985 145.267 54.6373 157.716C128.599 180.373 198.017 170.844 229.565 160.229Z" fill="#DAF7F3"></path>
                        <path d="M131.589 68.9422C131.593 68.9422 131.596 68.9422 131.599 68.9422C137.86 68.9422 142.935 63.6787 142.935 57.1859C142.935 50.6931 137.86 45.4297 131.599 45.4297C126.518 45.4297 122.218 48.8958 120.777 53.6723C120.022 53.4096 119.213 53.2672 118.373 53.2672C114.199 53.2672 110.815 56.7762 110.815 61.1047C110.815 65.4332 114.199 68.9422 118.373 68.9422C118.377 68.9422 118.381 68.9422 118.386 68.9422H131.589Z" fill="white"></path>
                        <path d="M105.682 128.716C109.186 128.716 112.026 125.908 112.026 122.446C112.026 118.983 109.186 116.176 105.682 116.176C104.526 116.176 103.442 116.481 102.509 117.015L102.509 116.959C102.509 110.467 97.1831 105.203 90.6129 105.203C85.3224 105.203 80.8385 108.616 79.2925 113.335C78.6052 113.143 77.88 113.041 77.1304 113.041C72.7503 113.041 69.1995 116.55 69.1995 120.878C69.1995 125.207 72.7503 128.716 77.1304 128.716C77.1341 128.716 77.1379 128.716 77.1416 128.716H105.682L105.682 128.716Z" fill="white"></path>
                        <rect x="0.445307" y="0.549558" width="50.5797" height="100.068" rx="7.5" transform="matrix(0.994522 0.104528 -0.103907 0.994587 10.5547 41.6171)" fill="#42CBA5" stroke="#316474"></rect>
                        <rect x="0.445307" y="0.549558" width="50.4027" height="99.7216" rx="7.5" transform="matrix(0.994522 0.104528 -0.103907 0.994587 10.9258 37.9564)" fill="white" stroke="#316474"></rect>
                        <path d="M57.1609 51.7354L48.5917 133.759C48.2761 136.78 45.5713 138.972 42.5503 138.654L9.58089 135.189C6.55997 134.871 4.36688 132.165 4.68251 129.144L13.2517 47.1204C13.5674 44.0992 16.2722 41.9075 19.2931 42.2251L24.5519 42.7778L47.0037 45.1376L52.2625 45.6903C55.2835 46.0078 57.4765 48.7143 57.1609 51.7354Z" fill="#EEFEFA" stroke="#316474"></path>
                        <path d="M26.2009 102.937C27.0633 103.019 27.9323 103.119 28.8023 103.21C29.0402 101.032 29.2706 98.8437 29.4916 96.6638L26.8817 96.39C26.6438 98.5681 26.4049 100.755 26.2009 102.937ZM23.4704 93.3294L25.7392 91.4955L27.5774 93.7603L28.7118 92.8434L26.8736 90.5775L29.1434 88.7438L28.2248 87.6114L25.955 89.4452L24.1179 87.1806L22.9824 88.0974L24.8207 90.3621L22.5508 92.197L23.4704 93.3294ZM22.6545 98.6148C22.5261 99.9153 22.3893 101.215 22.244 102.514C23.1206 102.623 23.9924 102.697 24.8699 102.798C25.0164 101.488 25.1451 100.184 25.2831 98.8734C24.4047 98.7813 23.5298 98.6551 22.6545 98.6148ZM39.502 89.7779C38.9965 94.579 38.4833 99.3707 37.9862 104.174C38.8656 104.257 39.7337 104.366 40.614 104.441C41.1101 99.6473 41.6138 94.8633 42.1271 90.0705C41.2625 89.9282 40.3796 89.8786 39.502 89.7779ZM35.2378 92.4459C34.8492 96.2179 34.4351 99.9873 34.0551 103.76C34.925 103.851 35.7959 103.934 36.6564 104.033C37.1028 100.121 37.482 96.1922 37.9113 92.2783C37.0562 92.1284 36.18 92.0966 35.3221 91.9722C35.2812 92.1276 35.253 92.286 35.2378 92.4459ZM31.1061 94.1821C31.0635 94.341 31.0456 94.511 31.0286 94.6726C30.7324 97.5678 30.4115 100.452 30.1238 103.348L32.7336 103.622C32.8582 102.602 32.9479 101.587 33.0639 100.567C33.2611 98.5305 33.5188 96.4921 33.6905 94.4522C32.8281 94.3712 31.9666 94.2811 31.1061 94.1821Z" fill="#316474"></path>
                        <path d="M17.892 48.4889C17.7988 49.3842 18.4576 50.1945 19.3597 50.2923C20.2665 50.3906 21.0855 49.7332 21.1792 48.8333C21.2724 47.938 20.6136 47.1277 19.7115 47.0299C18.8047 46.9316 17.9857 47.5889 17.892 48.4889Z" fill="white" stroke="#316474"></path>
                        <path d="M231.807 136.678L197.944 139.04C197.65 139.06 197.404 139.02 197.249 138.96C197.208 138.945 197.179 138.93 197.16 138.918L196.456 128.876C196.474 128.862 196.5 128.843 196.538 128.822C196.683 128.741 196.921 128.668 197.215 128.647L231.078 126.285C231.372 126.265 231.618 126.305 231.773 126.365C231.814 126.381 231.842 126.395 231.861 126.407L232.566 136.449C232.548 136.463 232.522 136.482 232.484 136.503C232.339 136.584 232.101 136.658 231.807 136.678Z" fill="white" stroke="#316474"></path>
                        <path d="M283.734 125.679L144.864 135.363C141.994 135.563 139.493 133.4 139.293 130.54L133.059 41.6349C132.858 38.7751 135.031 36.2858 137.903 36.0856L276.773 26.4008C279.647 26.2005 282.144 28.364 282.345 31.2238L288.578 120.129C288.779 122.989 286.607 125.478 283.734 125.679Z" fill="white"></path>
                        <path d="M144.864 135.363C141.994 135.563 139.493 133.4 139.293 130.54L133.059 41.6349C132.858 38.7751 135.031 36.2858 137.903 36.0856L276.773 26.4008C279.647 26.2004 282.144 28.364 282.345 31.2238L288.578 120.129C288.779 122.989 286.607 125.478 283.734 125.679" stroke="#316474"></path>
                        <path d="M278.565 121.405L148.68 130.463C146.256 130.632 144.174 128.861 144.012 126.55L138.343 45.695C138.181 43.3846 139.994 41.3414 142.419 41.1723L272.304 32.1142C274.731 31.945 276.81 33.7166 276.972 36.0271L282.641 116.882C282.803 119.193 280.992 121.236 278.565 121.405Z" fill="#EEFEFA" stroke="#316474"></path>
                        <path d="M230.198 129.97L298.691 125.193L299.111 131.189C299.166 131.97 299.013 132.667 298.748 133.161C298.478 133.661 298.137 133.887 297.825 133.909L132.794 145.418C132.482 145.44 132.113 145.263 131.777 144.805C131.445 144.353 131.196 143.684 131.141 142.903L130.721 136.907L199.215 132.131C199.476 132.921 199.867 133.614 200.357 134.129C200.929 134.729 201.665 135.115 202.482 135.058L227.371 133.322C228.188 133.265 228.862 132.782 229.345 132.108C229.758 131.531 230.05 130.79 230.198 129.97Z" fill="#42CBA5" stroke="#316474"></path>
                        <path d="M230.367 129.051L300.275 124.175L300.533 127.851C300.591 128.681 299.964 129.403 299.13 129.461L130.858 141.196C130.025 141.254 129.303 140.627 129.245 139.797L128.987 136.121L198.896 131.245C199.485 132.391 200.709 133.147 202.084 133.051L227.462 131.281C228.836 131.185 229.943 130.268 230.367 129.051Z" fill="white" stroke="#316474"></path>
                        <ellipse rx="15.9969" ry="15.9971" transform="matrix(0.997577 -0.0695704 0.0699429 0.997551 210.659 83.553)" fill="#42CBA5" stroke="#316474"></ellipse>
                        <path d="M208.184 87.1094L204.777 84.3593C204.777 84.359 204.776 84.3587 204.776 84.3583C203.957 83.6906 202.744 83.8012 202.061 84.6073C201.374 85.4191 201.486 86.6265 202.31 87.2997L202.312 87.3011L207.389 91.4116C207.389 91.4119 207.389 91.4121 207.389 91.4124C208.278 92.1372 209.611 91.9373 210.242 90.9795L218.283 78.77C218.868 77.8813 218.608 76.6968 217.71 76.127C216.817 75.5606 215.624 75.8109 215.043 76.6939L208.184 87.1094Z" fill="white" stroke="#316474"></path>
                    </svg>
                    <div className="empty-chat-content">
                        <h1>WhatsApp Web</h1>
                        <p>Envia y recibe mensajes sin necesidad de tener tu teléfono conectado.</p>
                        <p>Usa WhastApp en hasta 4 dispositivos vinculados y 1 teléfono a la vez.</p>
                    </div>
                </div> 
            }
        </div>
    )
}
export default Chat