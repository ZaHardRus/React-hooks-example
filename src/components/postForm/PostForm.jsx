import React from 'react'
import { useState } from 'react'

//import s from './PostForm.module.css'
import { MyButton } from '../UI/myButton/MyButton'
import { MyInput } from "../UI/myInput/MyInput";


export const PostForm = (props) => {
    const [post, setPost] = useState({
        id: 0,
        title: '',
        body: ''
    });

    const addNewPost = (event) => {
        event.preventDefault();
        const newPost = {
            ...post,
            id:Date.now(),
        }
        props.createPost(newPost)
        setPost({title:'',body:''})
    }

    return (
        <form>
            <MyInput
                type="text"
                placeholder='Title'
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
            <MyInput
                type="text"
                placeholder='Description'
                value={post.body}
                onChange={(e) => setPost({ ...post, body: e.target.value })}
            />
            <MyButton onClick={addNewPost}>Create new post</MyButton>
        </form>
    )
}