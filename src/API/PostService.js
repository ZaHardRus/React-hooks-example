import axios from 'axios'
export class PostService {
    static async getAllPosts(limit=20,page=1,sort='') {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`,{
                params:{
                    _limit:limit,
                    _page:page,
                    _sort:sort,
                }
            })
            return response
        } catch (e) {
            alert('Произошла ошибка при получении постов, попробуйте позже...')
            console.log(e,'getAllPosts')
        }

    }
    static async getPost (id) {
        try{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            return response
        }catch (e){
            alert('Произошла ошибка при получении поста, попробуйте позже...')
            console.log(e,'getPost')
        }

    }
    static async getCommentsByPost (id) {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            return response
        }catch (e) {
            alert('Произошла ошибка при получении комментариев, попробуйте позже...')
            console.log(e,'getCommentsByPost')
        }

    }
}