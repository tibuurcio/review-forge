import {Button, Flex} from '@mparticle/aquarium'
import {useState} from 'react'
import {Diff, Hunk, parseDiff} from 'react-diff-view'
import {useReviewStore} from '../stores/ReviewStore.ts'

export function ReviewDiff() {
  const diff = useReviewStore(state => state.diff)

  const [isShowingDiff, setIsShowingDiff] = useState<boolean>()

  const files = parseDiff(diff)
  
  return <>
    {diff &&
     <Flex vertical className="reviewDiff">
       <Button className="reviewDiff__toggleDiff"
               onClick={e => setIsShowingDiff(!isShowingDiff)}>
         {isShowingDiff ? 'Hide' : 'View'} Diff
       </Button>

       {isShowingDiff &&
        <div className="reviewDiff__diffFiles">
          {files.map(renderFile)}
        </div>}
     </Flex>}
  </>

  function renderFile({ oldRevision, newRevision, type, hunks }) {
    return (
      <Diff key={oldRevision + '-' + newRevision} viewType="split" diffType={type} hunks={hunks}>
        {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk}/>)}
      </Diff>)
  }

}