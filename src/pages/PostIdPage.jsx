import { useState, useEffect } from 'react'
import { useParams } from "react-router"
import { PostService } from "../API/PostService"
import { MyLoader } from '../components/UI/myLoader/MyLoader'
import { useFetching } from "../hooks/useFetching"
import s from './PostIdPage.module.css'

export const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostById, isLoading] = useFetching(async () => {
        const response = await PostService.getPost(params.id)
        setPost(response.data)
    })
    const [fetchComments] = useFetching(async () => {
        const response = await PostService.getCommentsByPost(params.id)
        setComments(response.data)
    })
    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className={s.wrapper}>
            {isLoading
                ? <MyLoader />
                : <div className={s.post_item}>
                    <div className={s.post_item__title}>{post.id}. {post.title}</div>
                    <div className={s.post_item__body}>{post.body}</div>
                    <div className={s.comments_wrapper}>
                        <p>Коментарии:</p>
                        {comments.map(el => {
                            return (
                                <div className={s.comments_item}>
                                    <p className={s.comments_item__email}>{el.email}</p>
                                    <p className={s.comments_item__body}>{el.body}</p>
                                </div>
                            )
                        })}
                    </div>

                </div>}

        </div>
    )
}