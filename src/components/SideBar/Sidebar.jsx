import React from 'react'
import s from './Sidebar.module.css'
import reactsvg from '../../assets/react.svg'
import { Link } from 'react-router-dom'

export const Sidebar = ({ allFollowed, allCreated, posts, setShownPosts, fetchCreatedPosts, fetchFollowsData }) => {

    async function handleClick() {
        await fetchCreatedPosts()
        await fetchFollowsData()
    }

    function filter(value) {
        const filteredShownPosts = posts.filter((el) => {
            if (value == 'all') {
                return true;
            } else if (value == 'following') {
                return allFollowed.includes(el.POSTID)
            } else if (value == 'mine') {
                console.log(allCreated)
                return allCreated.includes(el.POSTID)
            }

        })


        setShownPosts([...filteredShownPosts])
    }
    return (
        <div className={s.container_sidebar}>
            <div className={s.user_info}>
                <img src={reactsvg} alt="" />
                <p>Usuário</p>
            </div>

            <ul className={s.filter_list}>
                <li onClick={async () => {
                    await handleClick('all')
                    filter('all')
                }}>Todos</li>

                <li onClick={async () => {
                    await handleClick('following')
                    filter('following')
                }}>Seguindo</li>

                <li onClick={async () => {
                    await handleClick('mine')
                    filter('mine')
                }}>Minhas votações</li>

                <li><Link to='/create'>Novo</Link></li>
            </ul>
        </div>
    )
}
