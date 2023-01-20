import {io} from 'socket.io-client'
import React from 'react'
import { public_path } from '../constants'


export const socket = io.connect(public_path)
export const SocketContext = React.createContext()