import {Button, Input} from 'antd'
import {ChangeEvent, useCallback, useState} from 'react'

interface DiffCommentEditorProps {
  commentId: string;
  type: 'edit' | 'create';
  defaultContent: string;
  onSave: (id: string, value: string) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CommentEditor({ commentId, type, defaultContent, onSave, onCancel, onDelete }: DiffCommentEditorProps) {
  const [value, setValue] = useState(defaultContent)
  const updateValue = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value),
    [])

  const save = useCallback(generateSave,
                           [commentId, value, onSave])

  const cancel = useCallback(generateCancel,
                             [commentId, type, onCancel, onDelete])

  return (
    <div>
      <Input.TextArea rows={6} value={value} onChange={updateValue}/>
      <footer>
        <Button onClick={cancel}>Cancel</Button>
        <Button type="primary" onClick={save}>Save</Button>
      </footer>
    </div>)


  function generateSave() {
    return onSave(commentId, value)
  }

  function generateCancel() {
    if (type === 'edit') {
      onCancel(commentId)
    } else {
      onDelete(commentId)
    }
  }

}
