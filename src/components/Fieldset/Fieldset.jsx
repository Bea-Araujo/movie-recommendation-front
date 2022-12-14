import React from 'react'
import s from './Fieldset.module.css'

export const Fieldset = ({ title, type, handleChange, keyValue, style }) => {
    return (
        <fieldset className={s.container}>
            <label>{title}</label>
            <input type={type} onChange={({ target }) => {
                const value = target.value
                handleChange(value, keyValue)
            }}
                style={style} required />
        </fieldset>
    )
}
