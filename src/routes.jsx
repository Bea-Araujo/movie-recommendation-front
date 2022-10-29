import React from 'react'
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'
import { CreatePost } from './pages/CreatePost/CreatePost'
import { Feed } from './pages/Feed/Feed'
import { Login } from './pages/Login/Login'
import { Signup } from './pages/Signup/Signup'

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/feed' element={<Feed />} />
                <Route path='/create' element={<CreatePost />} />

            </Switch>
        </BrowserRouter>
    )
}
