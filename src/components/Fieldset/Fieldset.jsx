import React from 'react'

export const Fieldset = ({ title, type, handleChange, keyValue, style }) => {
    return (
        <fieldset>
            <label>{title}</label>
            <input type={type} onChange={({ target }) => {
                const value = target.value
                handleChange(value, keyValue)
            }}
                style={style} required />
        </fieldset>
    )
}
