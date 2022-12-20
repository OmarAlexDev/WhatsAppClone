import './App.css'
import React from 'react'
import {Route,Routes, Navigate, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Login from './components/Login'
import { setCurrentUser } from './reducers/currentUserReducer'
import chatsService from './services/chatsService'

const App = ()=>{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currUser = useSelector(state=>state.currUser)
  
  React.useEffect(()=>{
    const user = window.localStorage.getItem('loggedWAUser')
    if(user!=null){
      const loggedUser = JSON.parse(user)
      dispatch(setCurrentUser(loggedUser))
      chatsService.setToken(loggedUser.token)   
      navigate('/')
    }
  },[])

  return(
    <>
      <Routes>
        <Route path="/" element={currUser!== null ? 
          <div id='main'>
            <Sidebar />
            <Chat />
          </div> : <Navigate replace to="/login" />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </>
  )
}

export default App
