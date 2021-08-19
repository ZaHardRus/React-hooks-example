import { useMemo } from "react"

export const useSortedList = (list, sort) => {
  const sortedPost = useMemo(() => {
    if (sort) {
      return [...list].sort((a, b) => a[sort].localeCompare(b[sort]))
    }
    return list
  }, [sort, list]);

  return sortedPost;
}

export const useSortedAndSearchedList = (list, sort, query) => {
  const sortedPost = useSortedList(list, sort);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPost.filter(el => el.title.toLowerCase().includes(query.toLowerCase()))
  }, [query, sortedPost]);
  return sortedAndSearchedPosts;
}