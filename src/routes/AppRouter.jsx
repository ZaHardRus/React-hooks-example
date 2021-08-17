import {useContext} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '.';
import { MyLoader } from '../components/UI/myLoader/MyLoader';
import { AuthContext } from '../context';

export const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    if(isLoading){
        return <MyLoader />
    }
    return (
        isAuth
            ?
            <Switch>
                {privateRoutes.map(el => {
                    return <Route key={el.path} component={el.component} exact={el.exact} path={el.path} />
                })}
                <Redirect to="/posts" />
            </Switch>
            :
            <Switch>
                {publicRoutes.map(el => {
                    return <Route key={el.path} component={el.component} exact={el.exact} path={el.path} />
                })}
                <Redirect to="/login" />
            </Switch>
    )
}