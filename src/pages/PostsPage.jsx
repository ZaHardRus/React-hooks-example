import {useState, useEffect, useRef} from 'react'
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
    const [filter, setFilter] = useState({sort: '', query: ''}); //поля: канфигурация сортировки + строка поиска
    const [visible, setVisible] = useState(false); //флаг видимости мадального окна
    const [totalPages, setTotalPages] = useState(0); //количество страниц в пагинации
    const [limit, setLimit] = useState(10); // количество постов на странце
    const [page, setPage] = useState(1); //текущая страница
    const [searchTimeout, setSearchTimeout] = useState(0)//таймаут перед запросом на сервер
    const lastPost = useRef(); // элемент для обсервера

    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAllPosts(limit, page, filter.sort, filter.query);
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
        fetchPosts(limit, page, filter.sort, filter.query)
        // eslint-disable-next-line
    }, [page, limit]);

    useEffect(() => {
        fetchPosts(limit, 1, filter.sort)
        // eslint-disable-next-line
    }, [filter.sort]);

    useEffect(() => {
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        if (filter.query !== '') {
            setSearchTimeout(setTimeout(() => {
                fetchPosts(limit, 1, filter.sort, filter.query)
            }, 1000))
        } else {
            fetchPosts(limit, 1, filter.sort, filter.query)
        }
        // eslint-disable-next-line
    }, [filter.query]);


    const createPost = (newPost) => {
        setPosts([newPost, ...posts])
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
                posts={posts}
                setPosts={setPosts}
            />

            {postError && <h2 style={{textAlign: 'center'}}>Произошла ошибка: {postError}</h2>}
            <PostsList removePost={removePost} posts={posts} title='Список постов №1'/>
            <div ref={lastPost}/>
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