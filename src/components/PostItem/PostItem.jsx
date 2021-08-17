import s from './PostItem.module.css'
import {MyButton} from '../UI/myButton/MyButton' 
import { useHistory } from 'react-router-dom'

export const PostItem = (props) => {
    const router = useHistory()
    return (
        <div className={s.post}>
            <div className={s.post__content}>
                <h2>{props.post.id}. {props.post.title}</h2>
                <p>{props.post.body}</p>
            </div>
            <div className={s.post__btn}>
                <MyButton onClick={()=>router.push(`/posts/${props.post.id}`)}>Open post</MyButton>
                <MyButton onClick={()=>props.removePost(props.post)}>Delete post</MyButton>
            </div>
        </div>
    )
}