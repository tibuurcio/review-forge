import {Alert} from '@mparticle/aquarium'

interface AiCommentProps {
  message: string
}

export function DiffAiComment(props: AiCommentProps) {
  return <>
    <Alert banner type="info" message={props.message} showIcon={false}/>
  </>
}
