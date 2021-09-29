import './MyNavbar.css'
import { useContext } from "react"
import {AuthContext} from '../../../context/.'
import { NavLink, useHistory} from "react-router-dom"
import {MyButton} from '../myButton/MyButton'


export const MyNavbar = () => {
    const path = useHistory().location.pathname;
    console.log(path)

    const {setIsAuth} = useContext(AuthContext)
    const out = (e) => {
        e.preventDefault();
        localStorage.removeItem('auth')
        setIsAuth(false)
    }

    return (
        <div className='navbar-wrapper'>
            <ul className='navbar_list'>
                <li className='navbar_list__item'><NavLink activeClassName = 'navbar_list__item_link active'  className='navbar_list__item_link' to="/about">О Нас</NavLink></li>
                <li className='navbar_list__item'><NavLink activeClassName = 'navbar_list__item_link active' className='navbar_list__item_link' to="/posts">Посты</NavLink></li>
                <MyButton onClick={out}>Выйти</MyButton>
            </ul>
            
        </div>
    )
}