import { useContext } from "react"
import {AuthContext} from '../../../context/.'
import { Link } from "react-router-dom"
import {MyButton} from '../myButton/MyButton'
export const MyNavbar = () => {
    const {setIsAuth} = useContext(AuthContext)
    const out = (e) => {
        e.preventDefault();
        localStorage.removeItem('auth')
        setIsAuth(false)
    }
    return (
        <div className='navbar'>
            <div className="navbar__items">
                <Link to="/about">О Нас</Link>
                <Link to="/posts">Посты</Link>
                <MyButton onClick={out}>Выйти</MyButton>
            </div>
        </div>
    )
}