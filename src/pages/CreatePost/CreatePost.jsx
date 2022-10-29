import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import { Fieldset } from '../../components/Fieldset/Fieldset'
import { postNewPost } from '../../services/PostsApi'
import s from './CreatePost.module.css'

export const CreatePost = () => {
    // const { user, setUser } = useContext(UserContext)
    const user = 1

    let isValidInput = true
    const navigate = useNavigate()

    const [fieldStyle, setFieldStyle] = useState([{}])

    const [data, setData] = useState({
        userid: user,
        title: ''
    })
    const fields = [
        {
            title: 'Filme ou série',
            type: 'text',
            keyValue: 'title'
        }
    ]

    async function sendNewPost(body) {
        postNewPost(body)
    }

    function handleChange(value, keyValue) {
        setData({ ...data, [keyValue]: value })
    }

    return (
        <div className={s.container}>

            <h1 className={s.title}>Movie Recommendation</h1>
            <form className={s.form_container}>
                {
                    fields.map(({ title, type, keyValue }, i) => {
                        return (<Fieldset title={title} type={type} handleChange={handleChange} keyValue={keyValue} key={keyValue} style={fieldStyle[i]} />)
                    })
                }

                <input type='submit' value='Criar' onClick={(e) => {
                    e.preventDefault()

                    if (data.title == '') {
                        setFieldStyle([{ border: '1px solid red' }])
                    } else {
                        setFieldStyle({})
                        sendNewPost(data)
                        navigate('/feed')
                    }
                }} />
            </form>
        </div>
    )
}
