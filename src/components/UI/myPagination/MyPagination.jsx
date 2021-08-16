import s from './MyPagination.module.css'
import { getPagesArray } from "../../../utils/getPagesSCount"
import { MyButton } from "../myButton/MyButton"
import { MySelect } from "../mySelect/MySelect"
export const MyPagination = ({ page, changePage, totalPages, setLimit, limit, setPage }) => {
    const changeLimit = (limit) => {
        setLimit(limit)
        setPage(1)
    }
    let pagesArray = getPagesArray(totalPages)
    return (
        <div className={s.paginationWrapper}>
            <div className='pagination'>{pagesArray.map(el =>
                <MyButton
                    key={el}
                    onClick={() => changePage(el)}
                    className={el === page ? 'page page-active' : 'page'}>{el}
                </MyButton>)}
            </div>
            <div>
                <MySelect
                    value={limit}
                    onChange={limit => changeLimit(limit)}
                    defaultValue='Постов на странице:'
                    options={[
                        { value: 10, name: '10 постов/стр' },
                        { value: 20, name: '20 постов/стр' },
                        { value: 50, name: '50 постов/стр' },
                        { value: 100, name: '100 постов/стр' }
                    ]}
                />
            </div>
        </div>
    )
}
