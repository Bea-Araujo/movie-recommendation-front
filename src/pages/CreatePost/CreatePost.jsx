import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg'
import { Fieldset } from '../../components/Fieldset/Fieldset'
import { SubmitBtn } from '../../components/SubmitBtn/SubmitBtn'
import { postNewPost } from '../../services/PostsApi'
import s from '../../styles/FormStyle.module.css'

export const CreatePost = () => {
    const user = 1

    const navigate = useNavigate()

    const [error, setError] = useState('')
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

    function validateInput() {
        if (data.title == '') {
            setFieldStyle([{ border: '1px solid red' }])
            setError('Campo inválido')
            return
        }

        setFieldStyle({})
        sendNewPost(data)
        navigate('/feed')
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

                <SubmitBtn style={s.submit_btn} text='Criar' handleClick={validateInput} />
            </form>
            <ErrorMsg style={s.error_msg} error={error} />
        </div>
    )
}
