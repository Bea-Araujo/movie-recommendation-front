import React from 'react'
import s from './TitleCard.module.css'

export const TitleCard = () => {
    return (
        <div className={s.card_container}>

            {/* status */}
            <p>Open</p>
            {/* botão para deletar */}
            <h2>Titulo</h2>
            {/* botão para seguir */}
            <button>Follow</button>
            {/* botão para recomendar */}
            <button>Recommend</button>
            {/* botão para não recomendar */}
            <button>Not Recommend</button>


        </div>
    )
}
