import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fieldset } from '../../components/Fieldset/Fieldset'
import { SubmitBtn } from '../../components/SubmitBtn/SubmitBtn'
import { getUsers, postNewUser } from '../../services/UsersApi'
import s from '../../styles/FormStyle.module.css'

export const Signup = () => {
    let isUsernameTaken = false
    let isValidUser = true
    const navigate = useNavigate()

    const [fieldStyle, setFieldStyle] = useState([{}, {}, {}])

    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState('')

    const fields = [
        {
            title: 'User',
            type: 'text',
            keyValue: 'username',
        },
        {
            title: 'Password',
            type: 'password',
            keyValue: 'password',
        },
        {
            title: 'Confirm Password',
            type: 'password',
            keyValue: 'confirmPassword',
        }
    ]

    function handleChange(value, keyValue) {
        setData({ ...data, [keyValue]: value })
    }

    function comparePasswords() {
        if (data.confirmPassword == data.password && data.password != '') {
            fieldStyle[1] = {}
            fieldStyle[2] = {}
            isValidUser = true
            setError('')
        } else {
            fieldStyle[1] = { border: '1px solid red' }
            fieldStyle[2] = { border: '1px solid red' }
            isValidUser = false
            setError('Senhas diferentes')
        }
    }

    function findBlankFields() {
        let fieldNum = 0
        for (const [key, value] of Object.entries(data)) {
            if (value == '') {
                fieldStyle[fieldNum] = { border: '1px solid red' }
                isValidUser = false
                setError('Campo(s) vazio(s)')
            }
            else fieldStyle[fieldNum] = {}
            fieldNum++
        }
    }

    async function checkUsernameAvailability() {
        const users = await getUsers()
        const searchForUsername = users.filter(({ USERNAME }) => {
            return USERNAME == data.username
        })

        searchForUsername.length > 0 ? isUsernameTaken = true : isUsernameTaken = false

        if (isUsernameTaken) {
            fieldStyle[0] = { border: '1px solid red' }
            setError('Usuário inválido')
        }
        else fieldStyle[0] = {};

    }

    async function validateFields() {
        findBlankFields()
        comparePasswords()

        if (data.username != '') {
            await checkUsernameAvailability()
            if (!isUsernameTaken && isValidUser) {
                postNewUser(data)
                navigate('/')
            }
        }
        setFieldStyle([...fieldStyle])
    }

    return (
        <div className={s.container}>

            <h1 className={s.title}>Signup</h1>

            <form className={s.form_container}>
                {
                    fields.map(({ title, type, keyValue }, i) => {
                        return (<Fieldset title={title} type={type} handleChange={handleChange} keyValue={keyValue} key={keyValue} style={fieldStyle[i]} />)
                    })
                }

                <SubmitBtn style={s.submit_btn} text='Cadastrar' handleClick={validateFields} />
            </form>

            <ErrorMsg style={s.error_msg} error={error} />

        </div>
    )
}
