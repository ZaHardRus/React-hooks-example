import { useContext } from "react"
import { MyButton } from "../components/UI/myButton/MyButton"
import { MyInput } from "../components/UI/myInput/MyInput"
import { AuthContext } from "../context"

export const LoginPage = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const submit = (e) => {
        e.preventDefault()
        const result = {
            login:e.target['login'].value,
            password:e.target['password'].value,
        }
        if(result.login === 'root' && result.password == 'root'){
            localStorage.setItem('auth','true')
            setIsAuth(true)
        }
    }
    return (
        <div>
            <h1>LohinPage</h1>
            <form onSubmit={submit}>
                <MyInput name='login' type="text" placeholder='Введите логин' />
                <MyInput name='password' type="password" placeholder='Введите пароль' />
                <MyButton>login</MyButton>
            </form>
        </div>
        
    )
}