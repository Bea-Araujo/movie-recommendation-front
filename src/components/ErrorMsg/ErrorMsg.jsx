import React from 'react'

export const ErrorMsg = ({ style, error }) => {
    return (
        <p className={style}>{error}</p>
    )
}
