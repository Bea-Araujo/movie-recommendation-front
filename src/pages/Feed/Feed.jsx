import React, { useContext, useState } from 'react'
import s from './Feed.module.css'
import { Sidebar } from '../../components/SideBar/Sidebar'
import { TitleCard } from '../../components/TitleCard/TitleCard'
import { useEffect } from 'react'
import { getAllPosts } from '../../services/PostsApi'
import { UserContext } from '../../App'

export const Feed = () => {
    const { user, setUser } = useContext(UserContext)
    const [posts, setPosts] = useState([])

    const [hasPostChanged, setHasPostChanged] = useState(false)

    async function fetchData() {
        const data = await getAllPosts()
        setPosts([...data])
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (hasPostChanged) {
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            setHasPostChanged(false)
        }
    }, [hasPostChanged])

    return (
        <div className={s.container_main}>
            <Sidebar />


            <>
                {/* div needs display flex with reverse-column */}
                {
                    posts.map(({ POSTID, USERID, STATUS, TITLE, FOLLOWERS, LIKES, DISLIKES }, i) => {
                        return (<TitleCard postid={POSTID} status={STATUS == "1" ? 'open' : 'closed'} title={TITLE} key={i} followers={FOLLOWERS} setListener={setHasPostChanged} listener={hasPostChanged} />)
                    })
                }
            </>

        </div>
    )
}
