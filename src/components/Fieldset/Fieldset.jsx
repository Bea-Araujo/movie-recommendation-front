import React from 'react'

export const Fieldset = ({ title, type, handleChange, keyValue }) => {
    return (
        <fieldset>
            <label>{title}</label>
            <input type={type} onChange={({ target }) => {
                const value = target.value
                handleChange(value, keyValue)
            }} />
        </fieldset>
    )
}
