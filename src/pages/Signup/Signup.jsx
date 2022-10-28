import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fieldset } from '../../components/Fieldset/Fieldset'
import { getUsers, postNewUser } from '../../services/UsersApi'

export const Signup = () => {
    let isUsernameTaken = false
    let isValidUser = true
    const navigate = useNavigate()

    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [fieldStyle, setFieldStyle] = useState([{}, {}, {}])

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
        } else {
            fieldStyle[1] = { border: '1px solid red' }
            fieldStyle[2] = { border: '1px solid red' }
            isValidUser = false
        }
        setFieldStyle([...fieldStyle])
    }

    function findBlankFields() {
        let fieldNum = 0
        for (const [key, value] of Object.entries(data)) {
            if (value == '') {
                fieldStyle[fieldNum] = { border: '1px solid red' }
                isValidUser = false
            }
            else fieldStyle[fieldNum] = {}
            fieldNum++
        }
        setFieldStyle([...fieldStyle])
    }

    async function checkUsernameAvailability() {
        const users = await getUsers()
        const searchForUsername = users.filter(({ USERNAME }) => {
            return USERNAME == data.username
        })

        searchForUsername.length > 0 ? isUsernameTaken = true : isUsernameTaken = false
        isUsernameTaken ? fieldStyle[0] = { border: '1px solid red' } : fieldStyle[0] = {};
        setFieldStyle([...fieldStyle])

    }

    async function validateFields() {
        comparePasswords()
        findBlankFields()

        if (data.username != '') {
            await checkUsernameAvailability()
            if (!isUsernameTaken && isValidUser) {
                postNewUser(data)
                navigate('/login')
            }
        }
    }

    return (
        <div>Signup
            <form>
                {
                    fields.map(({ title, type, keyValue, style }, i) => {
                        return (<Fieldset title={title} type={type} handleChange={handleChange} keyValue={keyValue} key={keyValue} style={fieldStyle[i]} />)
                    })
                }

                <input type='submit' value='Cadastrar' onClick={(e) => {
                    e.preventDefault()
                    validateFields()
                }} />
            </form>

        </div>
    )
}
