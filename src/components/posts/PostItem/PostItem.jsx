import s from './PostItem.module.css'
import {MyButton} from '../../UI/myButton/MyButton' 

export const PostItem = (props) => {
    return (
        <div className={s.post}>
            <div className={s.post__content}>
                <h2>{props.post.id}. {props.post.title}</h2>
                <p>{props.post.body}</p>
            </div>
            <div className={s.post__btn}>
                <MyButton onClick={()=>props.removePost(props.post)}>Delete post</MyButton>
            </div>
        </div>
    )
}