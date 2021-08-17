import { useState, useEffect } from 'react'
import { useParams } from "react-router"
import { PostService } from "../API/PostService"
import { MyLoader } from '../components/UI/myLoader/MyLoader'
import { useFetching } from "../hooks/useFetching"

export const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getPost(params.id)
        setPost(response.data)
    })
    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPost(params.id)
        setComments(response.data)
    })
    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            {isLoading
                ? <MyLoader />
                : <div>
                    <div>{post.id}. {post.title}</div>
                    <div>{post.body}</div>
                    <p>Коментарии:</p>
                    <hr />
                    {comments.map(el => {
                        return (
                            <div>
                                <p>{el.email}</p>
                                <p>{el.body}</p>
                                <hr />
                            </div>
                        )
                    })}
                </div>}

        </div>
    )
}