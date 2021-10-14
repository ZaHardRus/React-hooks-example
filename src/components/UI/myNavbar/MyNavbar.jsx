import './MyNavbar.css'
import {useContext} from "react"
import {AuthContext} from '../../../context/.'
import {NavLink, useHistory} from "react-router-dom"
import {MyButton} from '../myButton/MyButton'


export const MyNavbar = () => {
    const path = useHistory().location.pathname;

    const {setIsAuth} = useContext(AuthContext)
    const out = (e) => {
        e.preventDefault();
        localStorage.removeItem('auth')
        setIsAuth(false)
    }

    return (
        <div className='navbar-wrapper'>
            <ul className='navbar_list App'>
                <div>
                    <li className='navbar_list__item'>
                        <NavLink activeClassName='navbar_list__item_link active'
                                 className='navbar_list__item_link'
                                 to="/posts">Посты
                        </NavLink></li>
                </div>
                <MyButton style={{color: "#fff", border: "1px solid #fff"}} onClick={out}>Выйти</MyButton>
            </ul>

        </div>
    )
}