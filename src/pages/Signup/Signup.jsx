import React, { useContext, useState } from 'react'
import { UserContext } from '../../App'
import { Fieldset } from '../../components/Fieldset/Fieldset'
import { getUsers } from '../../services/UsersApi'

export const Signup = () => {
    const { user, setUser } = useContext(UserContext)
    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
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
        },
        {
            title: 'Confirm Password',
            type: 'password',
            keyValue: 'confirm-password'
        }
    ]

    function handleChange(value, keyValue) {
        setData({ ...data, [keyValue]: value })
    }

    return (
        <div>Signup
            <form>
                {
                    fields.map(({ title, type, keyValue }) => {
                        return (<Fieldset title={title} type={type} handleChange={handleChange} keyValue={keyValue} key={keyValue} />)
                    })
                }

                <input type='submit' value='Cadastrar' onClick={(e) => {
                    e.preventDefault()
                    // validar se usuario existe no banco de dados
                    // caso sim -> entrar no menu
                    // caso não -> mostrar erro
                    setUser(data.username)
                    console.log(user)

                    getUsers()
                }} />
            </form>
        </div>
    )
}
