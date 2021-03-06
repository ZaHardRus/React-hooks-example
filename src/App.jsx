import './App.css'
import {BrowserRouter} from 'react-router-dom';
import {AppRouter} from './routes/AppRouter'
import {AuthContext} from './context';
import {useEffect, useState} from 'react';
import {MyNavbar} from "./components/UI/myNavbar/MyNavbar";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setIsLoading(false)
    }, [])
    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}>
            <BrowserRouter>
                <MyNavbar />
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;