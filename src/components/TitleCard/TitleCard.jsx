import React from 'react'
import { useState } from 'react'
import { deletePost, putPost } from '../../services/PostsApi'
import s from './TitleCard.module.css'

import { ReactComponent as Person } from '../../assets/icons/person.svg'
import { ReactComponent as Trashcan } from '../../assets/icons/trashCan.svg'
import { ReactComponent as Thumbsup } from '../../assets/icons/thumbsup.svg'
import { ReactComponent as Thumbsdown } from '../../assets/icons/thumbsdown.svg'

export const TitleCard = ({ postid, status, title, followers, allPosts, setAllPosts, listener, setListener }) => {
    const [isClosed, setIsClosed] = useState(status == 'open' ? false : true)
    const [text, setText] = useState(status == 'open' ? 'OPEN' : 'CLOSED')

    const [isFollowing, setIsFollowing] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [isDisliked, setIsDisliked] = useState(false)

    async function closePool(id) {
        const closeBody = {
            status: "0"
        }
        putPost(id, closeBody)
    }

    async function deletePool(id) {
        // setAllPosts(allPosts.filter((el) => el.POSTID == postid))
        setListener(true)
        deletePost(id)
    }

    return (
        <div className={s.card_container}>
            <header className={s.card_header}>
                {/* status */}
                <p className={isClosed ? s.status_closed : s.status_open} style={{ gridArea: 'status' }}>
                    {text}
                </p>

                <p className={s.close_btn} style={{ gridArea: 'close' }} onClick={
                    (e) => {
                        setIsClosed(true)
                        setText('CLOSED')
                        closePool(postid)
                    }
                }>
                    {isClosed ? ' ' : 'CLOSE'}
                </p>

                {/* botão para deletar */}
                <button className={s.delete_btn} style={{ gridArea: 'delete-btn', display: isClosed ? 'none' : 'block', cursor: followers > 1 ? 'not-allowed' : 'pointer' }} onClick={() => {
                    deletePool(postid)
                }}>
                    <Trashcan height='30px' width='30px' fill='red'></Trashcan>
                </button>

            </header>

            {/* titulo */}
            <h2 className={s.card_title}>{title}</h2>

            <footer className={s.card_footer}>

                {/* botão para seguir */}
                <button className={isFollowing ? s.btn_follow : 'none'} style={{ cursor: isClosed ? 'not-allowed' : 'pointer' }}
                    onClick={(e) => {
                        setIsFollowing(!isFollowing)
                    }}>
                    <Person height='30px' width='30px'></Person>
                </button>

                {/* botão para recomendar */}
                <button className={isLiked ? s.btn_like : 'none'} style={{ cursor: isClosed ? 'not-allowed' : 'pointer' }}
                    onClick={(e) => {
                        setIsLiked(!isLiked)
                        setIsDisliked(false)
                        setIsFollowing(true)
                    }}>
                    <Thumbsup height='30px' width='30px'></Thumbsup>
                </button>

                {/* botão para não recomendar */}
                <button className={isDisliked ? s.btn_dislike : 'none'} style={{ cursor: isClosed ? 'not-allowed' : 'pointer' }}
                    onClick={(e) => {
                        setIsDisliked(!isDisliked)
                        setIsLiked(false)
                        setIsFollowing(true)
                    }}>
                    <Thumbsdown height='30px' width='30px'></Thumbsdown>
                </button>
            </footer>


        </div>
    )
}
