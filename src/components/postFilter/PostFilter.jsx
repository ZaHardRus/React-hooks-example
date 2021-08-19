import { MySelect } from "../UI/mySelect/MySelect";
import { MyInput } from "../UI/myInput/MyInput";
import { PostService } from "../../API/PostService";
import { useEffect } from "react";

export const PostFilter = ({filter,setFilter}) => {

  useEffect(() => {
    PostService.getAllPosts(-1,1)
  }, [filter.query]);

    return (
        <div>
        <MyInput
          placeholder='Search...'
          value={filter.query}
          onChange={(e) => setFilter({...filter,query:e.target.value })}
        />
        <MySelect
          value={filter.sort}
          onChange={selectedSort=>setFilter({...filter,sort:selectedSort})}
          defaultValue='Сортировка по:'
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' }
          ]} />
      </div>
    )
}