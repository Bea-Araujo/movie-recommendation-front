import React from 'react'
import s from './Feed.module.css'
import { Sidebar } from '../../components/SideBar/Sidebar'
import { TitleCard } from '../../components/TitleCard/TitleCard'

export const Feed = () => {
    return (
        <div className={s.container_main}>
            <Sidebar />

            <TitleCard />
        </div>
    )
}
