import { PostIdPage } from "../pages/PostIdPage";
import { PostsPage } from "../pages/PostsPage";
import { LoginPage } from "../pages/LoginPage";

export const privateRoutes = [
    {path:'/posts', component:PostsPage, exact:true},
    {path:'/posts/:id', component:PostIdPage, exact:true},
]

export const publicRoutes = [
    {path:'/login', component:LoginPage, exact:true},
]