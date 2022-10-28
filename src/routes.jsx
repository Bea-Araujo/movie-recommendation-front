import React from 'react'
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'
import { Login } from './pages/Login/Login'

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' element={<Login />} />
            </Switch>
        </BrowserRouter>
    )
}
