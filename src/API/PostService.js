import axios from 'axios'
export class PostService {
    static async getAllPosts(limit=20,page=1) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`,{
            params:{
                _limit:limit,
                _page:page
            }
        })
        return response
    }
    static async getPost (id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        return response
    }
    static async getCommentsByPost (id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        return response
    }
}