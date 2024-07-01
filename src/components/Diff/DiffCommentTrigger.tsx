import {useCallback} from 'react'
import {ChangeData, getChangeKey} from 'react-diff-view'

interface CommentTriggerProps {
  change: ChangeData;
  onClick: (value: string) => void;
}

export default function CommentTrigger({ change, onClick }: CommentTriggerProps) {
  const click = useCallback(
    () => onClick(getChangeKey(change)),
    [change, onClick])

  return <span onClick={click}>+</span>
}
