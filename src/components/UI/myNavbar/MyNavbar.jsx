import { Link } from "react-router-dom"
export const MyNavbar = () => {
    return (
        <div className='navbar'>
            <div className="navbar__items">
                <Link to="/about">О Нас</Link>
                <Link to="/posts">Посты</Link>
            </div>
        </div>
    )
}