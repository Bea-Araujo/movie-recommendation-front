import React, { useEffect } from 'react'
import { useState } from 'react'
import { deletePost, putPost } from '../../services/PostsApi'
import s from './TitleCard.module.css'


import personsvg from '../../assets/icons/person.svg'
import trashcansvg from '../../assets/icons/trashCan.svg'
import thumbsupsvg from '../../assets/icons/thumbsUp.svg'
import thumbsdownsvg from '../../assets/icons/thumbsDown.svg'
import { deleteFollow, getFollowsById, postNewFollow, putFollowsById } from '../../services/FollowsApi'
import { ReactionBtn } from '../ReactionBtn/ReactionBtn'

export const TitleCard = ({ postid, authorid, status, title, followers, listenerForChanges, fetchFollowsData, allFollowed, setAllFollowed }) => {

    const user = localStorage.getItem('user')

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

    function closePost() {
        setIsClosed(true)
        setText('CLOSED')
        closePool(postid)
    }

    async function deletePool(id) {
        listenerForChanges(true)
        deletePost(id)
    }

    async function checkFollowExists() {
        const doesExist = await getFollowsById(user, postid)
        return doesExist.length > 0 ? true : false;
    }

    async function getFollowsInfo() {
        const exists = await getFollowsById(user, postid)
        if (exists.length > 0) {
            setIsFollowing(true)
            exists[0].LIKE == "1" ? setIsLiked(true) : setIsLiked(false);
            exists[0].DISLIKE == "1" ? setIsDisliked(true) : setIsDisliked(false);
        }
    }

    async function handleReactions(isReaction, reaction, oppositeReaction) {
        if (isReaction) {
            const body = {}
            body[reaction] = '0'

            putFollowsById(user, postid, body)
            allFollowed = allFollowed.filter((el) => {
                return el != postid
            })
            return
        }

        const body = {
            userid: user,
            postid: postid,
        }

        body[reaction] = '1'
        body[oppositeReaction] = '0'

        await checkFollowExists() ? putFollowsById(user, postid, body) : postNewFollow(body)
        allFollowed.push(postid)
    }

    async function handleLike() {
        await handleReactions(isLiked, 'like', 'dislike')

        setAllFollowed([...allFollowed])

        setIsLiked(!isLiked)
        setIsDisliked(false)
        setIsFollowing(true)
    }

    async function handleDislike() {
        await handleReactions(isDisliked, 'dislike', 'like')

        setAllFollowed([...allFollowed])

        setIsDisliked(!isDisliked)
        setIsLiked(false)
        setIsFollowing(true)
    }

    async function handleFollowData() {
        if (isFollowing) {
            deleteFollow(user, postid)
            allFollowed = allFollowed.filter((el) => {
                return el != postid
            })
            return
        }

        const body = {
            userid: user,
            postid: postid,
            like: '0',
            dislike: '0'
        }

        await checkFollowExists() ? putFollowsById(user, postid, body) : postNewFollow(body)
        allFollowed.push(postid)
    }

    async function handleFollow() {
        await handleFollowData()
        setAllFollowed([...allFollowed])

        if (isFollowing) {
            setIsLiked(false)
            setIsDisliked(false)
        }
        setIsFollowing(!isFollowing)
    }

    useEffect(() => {
        getFollowsInfo()
    }, [])


    return (
        <div className={s.card_container}>
            <header className={s.card_header}>

                {/* status */}
                <p className={isClosed ? s.status_closed : s.status_open}>
                    {text}
                </p>

                <p className={s.close_btn} style={{ display: isClosed || authorid != user ? 'none' : 'block' }} onClick={() => closePost()}>
                    CLOSE
                </p>


            </header>

            {/* titulo */}
            <h2 className={s.card_title}>{title}</h2>

            <footer className={s.card_footer}>
                <div className={s.card_footer__btn_blocker} style={{ display: isClosed ? 'block' : 'none' }}></div>

                {/* botão para deletar */}
                <button className={s.delete_btn} style={{ cursor: followers > 1 ? 'not-allowed' : 'pointer' }} onClick={() => deletePool(postid)}>
                    <img src={trashcansvg} alt="" />
                </button>

                {/* botão para seguir */}
                <ReactionBtn isReaction={isFollowing} handleClick={handleFollow} icon={personsvg} style={s.btn_follow} />

                {/* botão para recomendar */}
                <ReactionBtn isReaction={isLiked} handleClick={handleLike} icon={thumbsupsvg} style={s.btn_like} />

                {/* botão para não recomendar */}
                <ReactionBtn isReaction={isDisliked} handleClick={handleDislike} icon={thumbsdownsvg} style={s.btn_dislike} />

            </footer>


        </div>
    )
}
