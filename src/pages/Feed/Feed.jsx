import React, { useContext, useState } from 'react'
import s from './Feed.module.css'
import { Sidebar } from '../../components/SideBar/Sidebar'
import { TitleCard } from '../../components/TitleCard/TitleCard'
import { useEffect } from 'react'
import { getAllPosts } from '../../services/PostsApi'
import { UserContext } from '../../App'
import { getAllFollows } from '../../services/FollowsApi'

export const Feed = () => {
    // const { user, setUser } = useContext(UserContext)
    const user = 1
    const [posts, setPosts] = useState([])
    const [shownPosts, setShownPosts] = useState([])

    const [hasPostChanged, setHasPostChanged] = useState(false)

    const [allFollowed, setAllFollowed] = useState([])
    const [allCreated, setAllCreated] = useState([])

    async function fetchPostsData() {
        const data = await getAllPosts()
        setPosts([...data])
    }

    async function fetchShownPosts() {
        const data = await getAllPosts()
        setShownPosts([...data])
    }

    async function fetchCreatedPosts() {
        const data = await getAllPosts()
        const created = data.filter((el) => el.USERID == user).map((el) => el.POSTID)
        setAllCreated([...created])
    }

    async function fetchFollowsData() {
        const data = await getAllFollows()
        const following = data.filter((el) => el.USERID == user).map((el) => el.POSTID)
        setAllFollowed([...following])
    }

    useEffect(() => {
        fetchPostsData()
        fetchFollowsData()
        fetchShownPosts()
        fetchCreatedPosts()
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
            <Sidebar allFollowed={allFollowed} allCreated={allCreated} posts={posts} setShownPosts={setShownPosts} fetchCreatedPosts={fetchCreatedPosts} fetchFollowsData={fetchFollowsData} />


            <>
                {/* div needs display flex with reverse-column */}
                {
                    shownPosts
                        .map(({ POSTID, USERID, STATUS, TITLE, FOLLOWERS, LIKES, DISLIKES }, i, arr) => {
                            return (<TitleCard postid={POSTID} status={STATUS == "1" ? 'open' : 'closed'} title={TITLE} key={POSTID} followers={FOLLOWERS} setListener={setHasPostChanged} listener={hasPostChanged} />)
                        })
                }
            </>

        </div>
    )
}
