import s from './posts.module.css'
import { PostItem } from '../PostItem/PostItem'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export const PostsList = ({ posts, title, removePost }) => {
    if (!posts.length) {
        return (
            <h2 style={{textAlign:'center'}}>Посты не найдены</h2>
        )
    }
    return (
        <div className={s.posts}>
            <h1 className={s.posts__title}>{title}</h1>
            <TransitionGroup>
                {posts.map((el, i) => 
                <CSSTransition
                    key={el.id}
                    timeout={500}
                    classNames='el'
                >
                    <PostItem key={el.id} number={i + 1} post={el} removePost={removePost} />
                </CSSTransition>)}
            </TransitionGroup> 
        </div>
    )
}