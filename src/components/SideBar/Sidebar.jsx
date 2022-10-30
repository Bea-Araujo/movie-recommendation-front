import React from 'react'
import s from './Sidebar.module.css'
import reactsvg from '../../assets/react.svg'
import { Link } from 'react-router-dom'

export const Sidebar = ({ filterShownPosts, fetchCreatedPosts, fetchFollowsData }) => {

    async function fetchData() {
        await fetchCreatedPosts()
        await fetchFollowsData()
    }

    async function handleClick(value) {
        await fetchData()
        filterShownPosts(value)
    }

    return (
        <div className={s.container_sidebar}>
            <div className={s.user_info}>
                <img src={reactsvg} alt="" />
                <p>Usuário</p>
            </div>

            <ul className={s.filter_list}>
                <li onClick={() => { handleClick('all') }}>Todos</li>

                <li onClick={() => handleClick('following')}>Seguindo</li>

                <li onClick={() => handleClick('mine')}>Minhas votações</li>

                <li><Link to='/create'>Novo</Link></li>
            </ul>
        </div>
    )
}
