import {useState, useEffect, useRef} from 'react'
import {useSortedAndSearchedList} from '../hooks/useList'
import {PostForm} from "../components/postForm/PostForm";
import {PostFilter} from "../components/postFilter/PostFilter";
import {MyModal} from "../components/UI/myModal/MyModal";
import {MyButton} from '../components/UI/myButton/MyButton'
import {PostService} from '../API/PostService';
import {MyLoader} from '../components/UI/myLoader/MyLoader';
import {useFetching} from '../hooks/useFetching';
import {getPagesCount} from '../utils/getPagesSCount';
import {MyPagination} from '../components/UI/myPagination/MyPagination';
import {PostsList} from '../components/postsList/PostsList';
import {useObserver} from '../hooks/useObserver';

export const PostsPage = () => {
    const [posts, setPosts] = useState([]); // массив постов
    const [filter, setFilter] = useState({sort: '', query: ''}); //поля канфигурации сортировки + строка поиска
    const [visible, setVisible] = useState(false); //флаг видимости мадального окна
    const [totalPages, setTotalPages] = useState(0); //количество страниц в пагинации
    const [limit, setLimit] = useState(10); // количество постов на странце
    const [page, setPage] = useState(1); //текущая страница

    const lastPost = useRef(); // элемент для обсервера

    const sortedAndSearchedPosts = useSortedAndSearchedList(posts, filter.sort, filter.query); //

    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAllPosts(limit, page, filter.sort);
        if (page !== 1) {
            setPosts(prev => [...posts, ...response.data])
        } else {
            setPosts(prev => [...response.data])
        }
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPagesCount(totalCount, limit))
    })
    useObserver(lastPost, page < totalPages, isPostLoading, () => {
        setPage(page + 1);
    })
    useEffect(() => {
        fetchPosts(limit, page, filter.sort)
        // eslint-disable-next-line
    }, [page, limit]);

    useEffect(() => {
        fetchPosts(10, 1, filter.sort)
        // eslint-disable-next-line
    }, [filter.sort]);


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setVisible(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(el => el.id !== post.id))
    }
    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className={'App'}>
            <MyButton
                onClick={() => setVisible(true)}
                style={{marginTop: '30px'}}>
                Создать пост
            </MyButton>

            <MyModal visible={visible} setVisible={setVisible}>
                <PostForm createPost={createPost}/>
            </MyModal>

            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            {postError && <h2 style={{textAlign: 'center'}}>Произошла ошибка: {postError}</h2>}
            <PostsList removePost={removePost} posts={sortedAndSearchedPosts} title='Список постов №1'/>
            <div ref={lastPost}></div>
            {isPostLoading &&
            <div className='loaderWrapper'>
                <MyLoader/>
            </div>
            }
            {page >= totalPages
                ? null
                : <MyPagination
                    page={page}
                    setPage={setPage}
                    changePage={changePage}
                    totalPages={totalPages}
                    limit={limit}
                    setLimit={setLimit}/>}
        </div>
    );
}