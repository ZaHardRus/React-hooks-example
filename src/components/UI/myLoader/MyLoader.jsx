import React from 'react'
import s from './MyLoader.module.css'

export const MyLoader = () => {
    return (
        <div className={s.loader_wrapper}>
            <div className={s.loader}></div>
        </div>
        
    )
}