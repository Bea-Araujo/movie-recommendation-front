import React from 'react'
import s from './Sidebar.module.css'
import reactsvg from '../../assets/react.svg'

export const Sidebar = () => {
    return (
        <div className={s.container_sidebar}>
            <div className={s.user_info}>
                <img src={reactsvg} alt="" />
                <p>Usuário</p>
            </div>

            <ul className={s.filter_list}>
                <li>Todos</li>
                <li>Seguindo</li>
                <li>Minhas votações</li>
            </ul>
        </div>
    )
}
