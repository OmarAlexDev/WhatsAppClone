import './App.css'
import React from 'react'
import {Route,Routes, Navigate, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Login from './components/Login'
import { setCurrentUser } from './reducers/currentUserReducer'
import tokenService from './services/tokenService'

const App = ()=>{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currUser = useSelector(state=>state.currUser)
  
  React.useEffect(()=>{
    const user = window.localStorage.getItem('loggedWAUser')
    if(user!=null){
      const loggedUser = JSON.parse(user)
      dispatch(setCurrentUser(loggedUser))
      tokenService.setToken(loggedUser.token)   
      navigate('/')
    }
  },[])

  return(
    <>
      <Routes>
        <Route path="/" element={currUser=== null ? <Navigate replace to="/login" /> : <Navigate replace to="/chats" />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/chats" element={ currUser=== null ? <Navigate replace to="/login" /> :
          <div id='main'>
            <Sidebar />
            <Chat />
          </div>}
          />
      </Routes>
    </>
  )
}

export default App
