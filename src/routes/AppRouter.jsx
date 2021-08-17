import {useState} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '.';

export const AppRouter = () => {
    const [isAuth,setIsAuth] = useState(true)
    return (
        isAuth
            ?
            <Switch>
                {privateRoutes.map(el => {
                    return <Route component={el.component} exact={el.exact} path={el.path} />
                })}
                <Redirect to="posts" />
            </Switch>
            :
            <Switch>
                {publicRoutes.map(el => {
                    return <Route component={el.component} exact={el.exact} path={el.path} />
                })}
                <Redirect to="login" />
            </Switch>
    )
}