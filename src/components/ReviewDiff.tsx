import {Button, Flex} from '@mparticle/aquarium'
import {useState} from 'react'
import {Diff, GutterType, Hunk, parseDiff, ViewType} from 'react-diff-view'
import {useLocalStorage} from 'src/hooks/useLocalStorage.tsx'
import {LocalStorageKeys} from 'src/constants/LocalStorageKeys.ts'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export function ReviewDiff() {
  const { diff } = useReviewStore()

  const [isShowingDiff, setIsShowingDiff] = useState<boolean>()
  
  const [viewType, setViewType] = useLocalStorage<ViewType>(LocalStorageKeys.diffViewType, 'split')
  const [gutterType, setGutterType] = useLocalStorage<GutterType>(LocalStorageKeys.diffGutterType, 'anchor')

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

         {isShowingDiff && <>
           <Button onClick={e => { changeViewType() }}>
             Use View Mode&nbsp;<span className="capitalize">{nextViewType}</span>
           </Button>
           <Button onClick={e => { changeGutterType() }}>
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

  function changeViewType(): void {
    setViewType(nextViewType)
    localStorage.setItem(LocalStorageKeys.diffViewType, nextViewType as string)
  }

  function changeGutterType(): void {
    setGutterType(nextGutterType)
    localStorage.setItem(LocalStorageKeys.diffGutterType, nextGutterType as string)
  }

}