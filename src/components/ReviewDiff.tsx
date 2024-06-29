import {Button, Flex} from '@mparticle/aquarium'
import {useState} from 'react'
import {Diff, DiffProps, Hunk, parseDiff} from 'react-diff-view'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export function ReviewDiff() {
  const { diff } = useReviewStore()

  const [isShowingDiff, setIsShowingDiff] = useState<boolean>()
  const [viewType, setViewType] = useState<DiffProps['viewType']>('split')
  const [gutterType, setGutterType] = useState<DiffProps['gutterType']>('anchor')

  const files = parseDiff(diff)

  const nextViewType: typeof viewType = viewType === 'split' ? 'unified' : 'split'
  const nextGutterType: typeof gutterType = gutterType === 'none' ? 'anchor' : 'none'

  return <>
    {diff &&
     <Flex vertical className="reviewDiff">

       <span className="reviewDiff__diffControls">
         <Button onClick={e => setIsShowingDiff(!isShowingDiff)}>
           {isShowingDiff ? 'Hide' : 'View'} Diff
         </Button>

         {isShowingDiff &&
          <>
            <Button onClick={e => {
              setViewType(nextViewType)
            }}>
              Use View Mode&nbsp;<span className="capitalize">{nextViewType}</span>
            </Button>
            <Button onClick={e => {setGutterType(nextGutterType)}}>
              Use Gutter Mode&nbsp;<span className="capitalize">{nextGutterType}</span>
            </Button>
          </>}
         
       </span>


       {isShowingDiff && <>
         <div className="reviewDiff__diffFiles">
           {files.map(renderFile)}
         </div>
       </>}
     </Flex>}
  </>

  function renderFile({ oldRevision, newRevision, type, hunks }) {
    return (
      <Diff key={oldRevision + '-' + newRevision}
            viewType={viewType}
            diffType={type}
            hunks={hunks}
            gutterType={gutterType}
            generateAnchorID={generateAnchorID}>
        {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk}/>)}
      </Diff>)
  }

  function generateAnchorID(change): string {
    return Math.random().toString()
  }
}