import { useState, useEffect } from 'react'
import { useSortedAndSearchedList } from '../hooks/useList'
import { PostForm } from "../components/postForm/PostForm";
import { PostFilter } from "../components/postFilter/PostFilter";
import { MyModal } from "../components/UI/myModal/MyModal";
import { MyButton } from '../components/UI/myButton/MyButton'
import { PostService } from '../API/PostService';
import { MyLoader } from '../components/UI/myLoader/MyLoader';
import { useFetching } from '../hooks/useFetching';
import { getPagesCount } from '../utils/getPagesSCount';
import { MyPagination } from '../components/UI/myPagination/MyPagination';
import { PostsList } from '../components/postsList/PostsList';

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [visible, setVisible] = useState(false)
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1)

  const sortedAndSearchedPosts = useSortedAndSearchedList(posts, filter.sort, filter.query)
  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAllPosts(limit, page);
    setPosts(response.data)
    const totalCount = response.headers["x-total-count"]
    setTotalPages(getPagesCount(totalCount, limit))
    console.log(posts)
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setVisible(false)
  }
  const removePost = (post) => {
    setPosts(posts.filter(el => el.id !== post.id))
  }
  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className={'App'}>
      <MyButton
        onClick={() => setVisible(true)}
        style={{ marginTop: '30px' }}>
        Создать пост
      </MyButton>

      <MyModal visible={visible} setVisible={setVisible}>
        <PostForm createPost={createPost} />
      </MyModal>

      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />

      {postError && <h2 style={{ textAlign: 'center' }}>Произошла ошибка: {postError}</h2>}
      {isPostLoading
        ? <div className='loaderWrapper'><MyLoader /></div>
        : <PostsList removePost={removePost} posts={sortedAndSearchedPosts} title='Список постов №1' />
      }
      <MyPagination
        page={page}
        setPage={setPage}
        changePage={changePage}
        totalPages={totalPages}
        limit={limit}
        setLimit={setLimit} />
    </div>
  );
}