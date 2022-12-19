import './App.css'
import React from 'react'
import {Link, Route,Routes, Navigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Login from './components/Login'
import { setCurrentUser } from './reducers/currentUserReducer'

const App = ()=>{

  const currUser = useSelector(state=>state.currUser)

  return(
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={currUser!== null ? 
          <div id='main'>
            <Sidebar />
            <Chat />
          </div> : <Navigate replace to="/login" />}/>
      </Routes>
    </>
  )
}

export default App
