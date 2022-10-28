import React from 'react'
import { useState } from 'react'
import { Routes } from './routes.jsx'

export const UserContext = React.createContext()

export const App = () => {
    const [user, setUser] = useState('')

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Routes />
        </UserContext.Provider>
    )
}
