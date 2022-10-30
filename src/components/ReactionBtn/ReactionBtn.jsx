import React from 'react'

export const ReactionBtn = ({ isReaction, handleClick, icon, style }) => {
    return (
        <button className={isReaction ? style : 'none'}
            onClick={async () => await handleClick()}>
            <img src={icon} />
        </button>
    )
}
