import {Padding} from '@mparticle/aquarium/dist/style.ts'
import DiffDisplay from 'src/components/Diff/DiffDisplay'
import DiffEditor from 'src/components/Diff/DiffEditor'

interface DiffCommentProps {
  id: string;
  content: string;
  state: 'create' | 'edit' | 'display';
  time: Date;
  onSave: (id: string, content: string) => void;
  onEdit: (id: string) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function Comment({ id, content, state, time, onSave, onEdit, onCancel, onDelete }: DiffCommentProps) {
  return (
    <div style={{ padding: Padding }}>
      {
        state === 'display' ?
        <DiffDisplay commentId={id} content={content} time={time} onEdit={onEdit} onDelete={onDelete}/> :
        <DiffEditor
          commentId={id}
          type={state}
          defaultContent={content}
          onSave={onSave}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      }
    </div>)
}
