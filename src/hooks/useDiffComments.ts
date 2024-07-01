import {nanoid} from 'nanoid'
import {useCallback, useState} from 'react'

interface CommentData {
  id: string;
  changeKey: string;
  state: 'create' | 'edit' | 'display';
  content: string;
  time: Date;
}

export function useDiffComments() {
  const [comments, setComments] = useState<CommentData[]>([])

  const addComment = useCallback(
    (changeKey: string) => {
      debugger
      const addNew = (state: CommentData[]): CommentData[] => [
        ...state,
        { changeKey, id: nanoid(), state: 'create', content: 'abc', time: new Date() },
      ]
      debugger
      setComments(addNew)
      comments
    }, [])

  const editComment = useCallback(
    (commentId: string) => {
      const mayUpdate = (comment: CommentData): CommentData => {
        if (comment.id !== commentId) {
          return comment
        }

        return { ...comment, state: 'edit' }
      }
      setComments(s => s.map(mayUpdate))
    }, [])

  const saveEdit = useCallback(
    (commentId: string, content: string) => {
      const mayUpdate = (comment: CommentData): CommentData => {
        if (comment.id !== commentId) {
          return comment
        }

        return { ...comment, content, state: 'display', time: new Date() }
      }
      setComments(s => s.map(mayUpdate))
    }, [])

  const cancelEdit = useCallback(
    (commentId: string) => {
      const mayUpdate = (comment: CommentData): CommentData => {
        if (comment.id !== commentId) {
          return comment
        }

        return { ...comment, state: 'display' }
      }
      setComments(s => s.map(mayUpdate))
    }, [])

  const deleteComment = useCallback(
    (commentId: string) => setComments(s => s.filter(v => v.id !== commentId)),
    [])

  return [comments, { addComment, editComment, saveEdit, cancelEdit, deleteComment }] as const
}
