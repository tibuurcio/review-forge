import {useCallback} from 'react'

interface DiffCommentDisplayProps {
  commentId: string;
  content: string;
  time: Date;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CommentDisplay({ commentId, content, time, onEdit, onDelete }: DiffCommentDisplayProps) {
  const edit = useCallback(() => onEdit(commentId),
                           [commentId, onEdit])

  const remove = useCallback(() => onDelete(commentId),
                             [commentId, onDelete])

  return (<>
    <div>{content}</div>
    <footer>
      <time>{time.toLocaleDateString()} {time.toLocaleTimeString()}</time>
      <button onClick={edit}>edit</button>
      <button onClick={remove}>delete</button>
    </footer>
  </>
)}
