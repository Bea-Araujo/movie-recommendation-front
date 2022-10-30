import React, { useState } from 'react'
import s from './Feed.module.css'
import { Sidebar } from '../../components/SideBar/Sidebar'
import { TitleCard } from '../../components/TitleCard/TitleCard'
import { useEffect } from 'react'
import { getAllPosts } from '../../services/PostsApi'
import { getAllFollows } from '../../services/FollowsApi'


export const Feed = () => {
    // const { user, setUser } = useContext(UserContext)
    const user = localStorage.getItem('user')

    const [posts, setPosts] = useState([])
    const [shownPosts, setShownPosts] = useState([])

    const [hasPostChanged, setHasPostChanged] = useState(false)

    const [allFollowed, setAllFollowed] = useState([])
    // let allFollowed = []
    const [allCreated, setAllCreated] = useState([])

    async function fetchPostsData() {
        const data = await getAllPosts()
        setPosts([...data])
        setShownPosts([...data])
        const created = data.filter((el) => el.USERID == user).map((el) => el.POSTID)
        setAllCreated([...created])
    }

    async function fetchCreatedPosts() {
        const created = posts.filter((el) => el.USERID == user).map((el) => el.POSTID)
        setAllCreated([...created])
    }

    async function fetchFollowsData() {
        const data = await getAllFollows()
        const following = data.filter((el) => el.USERID == user).map((el) => el.POSTID)
        setAllFollowed([...following])
        // allFollowed = following;
    }

    function listenerForChanges() {
        setHasPostChanged(true)
    }

    function filterShownPosts(value) {
        const filteredShownPosts = posts.filter((el) => {
            if (value == 'all') {
                return true;
            } else if (value == 'following') {
                return allFollowed.includes(el.POSTID)
            } else if (value == 'mine') {
                return allCreated.includes(el.POSTID)
            }
        })
        setShownPosts([...filteredShownPosts])
    }

    useEffect(() => {
        fetchPostsData()
        fetchFollowsData()
    }, [])

    useEffect(() => {
        if (hasPostChanged) {
            setTimeout(() => {
                window.location.reload()
                setHasPostChanged(false)
            }, 200)
        }

    }, [hasPostChanged, shownPosts])

    return (
        <div className={s.container_main}>
            <Sidebar filterShownPosts={filterShownPosts} fetchCreatedPosts={fetchCreatedPosts} fetchFollowsData={fetchFollowsData} />


            <>
                {/* div needs display flex with reverse-column */}
                {
                    shownPosts
                        .map(({ POSTID, USERID, STATUS, TITLE }) => {
                            return (<TitleCard postid={POSTID} authorid={USERID} status={STATUS == "1" ? 'open' : 'closed'} title={TITLE} key={POSTID}
                                listenerForChanges={listenerForChanges} listener={hasPostChanged} fetchFollowsData={fetchFollowsData} allFollowed={allFollowed} setAllFollowed={setAllFollowed} />)
                        })
                }
            </>

        </div>
    )
}
