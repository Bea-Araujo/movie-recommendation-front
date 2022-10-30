import React from 'react'

export const SubmitBtn = ({ style, text, handleClick }) => {
    return (
        <input className={style} type='submit' value={text} onClick={(e) => {
            e.preventDefault()
            handleClick()
        }} />
    )
}
