import React from "react"
import SideChats from "./SideChats"
import { useSelector } from "react-redux"
import SideChatInfo from "./SideChatInfo"
import SideChatCreator from "./SideChatCreator"
import SideUserInfo from "./SideUserInfo"

 const Sidebar = ()=>{
    const currSideEl = useSelector(state=>state.sideBar)
    const sidebar_styles={
        backgroundColor: "#fffff"
    }
    const sideInfo_styles={
        width: currSideEl !== null ? "100%" : "0%"
    }

    return(
        <div id="sidebar" style={sidebar_styles}>
            <SideChats />
            <div id="sideInfo" style={sideInfo_styles}>
                { currSideEl !== null ?
                    <>
                        <SideChatInfo />
                        <SideChatCreator />
                        <SideUserInfo />
                    </> 
                    :
                    null
                } 
            </div>
        </div>
    )
 }

 export default Sidebar