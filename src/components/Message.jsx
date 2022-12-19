import React from "react"

const Message =  (props)=>{
    const {content, time,active,id} = props.data
    const {primary} = props
    const [deleteIsVisible, setDeleteIsVisible] = React.useState(false)
    const prettyDate= new Date(time)
    const prettyTime = `${prettyDate.getHours()}:${prettyDate.getMinutes()}`

    const message_style = {
        flexDirection : primary ===true ? "row-reverse" : "row"
    }
    const message_content_style = {
        backgroundColor : primary === true ? "#d9fdd3" : "#fff",
        borderRadius : primary ===true ? "10px 0 10px 10px" : "0 10px 10px 10px"
    }
    const message_content_text_style = {
        color: active ===true ? "black" : "#8696a0"
    }
    const span_style={
        opacity: deleteIsVisible===true && active ? "1" : "0"
    }
    
    return(
        <div className="message" style={message_style}>
            {primary === true ?
                <svg className="outerTail" viewBox="0 0 8 13" preserveAspectRatio="xMidYMid meet" x="0px" y="0px">
                    <path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path>
                    <path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path>
                </svg>
                :
                <svg className="innerTail" viewBox="0 0 8 13" preserveAspectRatio="xMidYMid meet" x="0px" y="0px">
                    <path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path>
                    <path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path>
                </svg>
            }
            <div className="message-content" style={message_content_style} onMouseEnter={()=>setDeleteIsVisible(true)} onMouseLeave={()=>setDeleteIsVisible(false)}>
                <div className="text" style={message_content_text_style}>
                    {active ? null : 
                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.75897 6.43054C8.93584 5.533 10.4057 5 12 5C15.866 5 19 8.13401 19 12C19 13.5943 18.467 15.0642 17.5695 16.241L7.75897 6.43054ZM6.35707 7.85707C5.50399 9.01706 5 10.4497 5 12C5 15.866 8.13401 19 12 19C13.5503 19 14.9829 18.496 16.1429 17.6429L6.35707 7.85707ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="currentColor"></path>
                        </svg>
                    }
                    {content}
                </div>
                <div className="message-content-details">
                    <span style={span_style} onClick={active ? ()=>props.handleDelete(id) : null}>
                        <svg viewBox="0 0 18 18" preserveAspectRatio="xMidYMid meet" x="0px" y="0px">
                            <path fill="currentColor" d="M3.3,4.6L9,10.3l5.7-5.7l1.6,1.6L9,13.4L1.7,6.2L3.3,4.6z"></path>
                        </svg>
                    </span>
                    <div className="time">{prettyTime}</div>
                </div> 
            </div>
        </div>
    )
}
export default Message