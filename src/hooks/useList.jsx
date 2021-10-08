import { useMemo } from "react"

export const useSortedList = (list, sort) => {
  const sortedPost = useMemo(() => {
    console.log(list)
    if (sort) {
      return [...list].sort((a, b) => a[sort].localeCompare(b[sort]))
    }
    return list
  }, [sort, list]);

  return sortedPost;
}

export const useSearchedList = (list, query) => {
  const searchedPosts = useMemo(() => {
    return list.filter(el => el.title.toLowerCase().includes(query.toLowerCase()))
  }, [query,list]);
  return searchedPosts;
}