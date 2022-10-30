import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Fieldset } from '../../components/Fieldset/Fieldset'
import { getUsers } from '../../services/UsersApi'
import s from './Login.module.css'

export const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    let isValid = false
    const [error, setError] = useState('')

    const fields = [
        {
            title: 'User',
            type: 'text',
            keyValue: 'username'
        },
        {
            title: 'Password',
            type: 'password',
            keyValue: 'password'
        }
    ]

    function handleChange(value, keyValue) {
        setData({ ...data, [keyValue]: value })
    }

    async function validateUser() {
        const users = await getUsers()
        console.log(users)
        const userInfo = users.filter((el) => el.USERNAME == data.username)

        if (userInfo.length == 0) {
            isValid = false;
            setError('Usuário inválido')
            return
        }

        const hasValidPassword = userInfo[0].PASSWORD == data.password
        isValid = (hasValidPassword ? true : false)
        setError(hasValidPassword ? '' : 'Senha Inválida')
        return userInfo[0].USERID
    }

    return (
        <div className={s.container}>

            <h1 className={s.title}>Movie Recommendation</h1>
            <form className={s.form_container}>
                {
                    fields.map(({ title, type, keyValue }) => {
                        return (<Fieldset title={title} type={type} handleChange={handleChange} keyValue={keyValue} key={keyValue} />)
                    })
                }

                <input type='submit' value='Entrar' onClick={async (e) => {
                    e.preventDefault()

                    const userId = await validateUser()
                    console.log(isValid)
                    if (isValid) {
                        setUser(userId)
                        localStorage.setItem('user', userId);
                        navigate('/feed')
                    }
                }} />
            </form>

            <p>{error}</p>

            <p>
                Não tem login? <Link to='/signup'>Cadastre-se</Link>
            </p>
        </div>
    )
}
