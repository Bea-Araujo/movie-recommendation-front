import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import { Fieldset } from '../../components/Fieldset/Fieldset'
import s from './Login.module.css'

export const Login = () => {
    const { user, setUser } = useContext(UserContext)
    const [data, setData] = useState({
        username: '',
        password: ''
    })

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

    return (
        <div className={s.container}>

            <h1 className={s.title}>Movie Recommendation</h1>
            <form className={s.form_container}>
                {
                    fields.map(({ title, type, keyValue }) => {
                        return (<Fieldset title={title} type={type} handleChange={handleChange} keyValue={keyValue} key={keyValue} />)
                    })
                }

                <input type='submit' value='Entrar' onClick={(e) => {
                    e.preventDefault()
                    // validar se usuario existe no banco de dados
                    // caso sim -> entrar no menu
                    // caso não -> mostrar erro
                    setUser(data.username)
                    console.log(user)
                }} />
            </form>

            <p>
                Não tem login? <Link to='/signup'>Cadastre-se</Link>
            </p>
        </div>
    )
}
