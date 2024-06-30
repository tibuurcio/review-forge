import {Button, Flex, Radio} from '@mparticle/aquarium'
import {useState} from 'react'
import {Diff, GutterType, Hunk, parseDiff, ViewType} from 'react-diff-view'
import {LocalStorageKeys} from 'src/constants/LocalStorageKeys.ts'
import {useLocalStorage} from 'src/hooks/useLocalStorage.tsx'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export function ReviewDiff() {
  const { diff } = useReviewStore()

  const [isShowingDiff, setIsShowingDiff] = useState<boolean>()

  const [viewType, setViewType] = useLocalStorage<ViewType>(LocalStorageKeys.diffViewType, 'split')
  const [gutterType, setGutterType] = useLocalStorage<GutterType>(LocalStorageKeys.diffGutterType, 'anchor')

  const files = parseDiff(diff)

  const viewTypeOptions = [
    { label: 'Split', value: 'split' },
    { label: 'Unified', value: 'unified' }]

  const gutterTypeOptions = [
    { label: 'None', value: 'none' },
    { label: 'Anchor', value: 'anchor' }]

  return <>
    {diff &&
     <Flex vertical className="reviewDiff">

       <span className="reviewDiff__diffControls">
         <Button onClick={e => setIsShowingDiff(!isShowingDiff)}>
           {isShowingDiff ? 'Hide' : 'View'} Diff
         </Button>

         {isShowingDiff && <>
           <Radio.Group options={viewTypeOptions}
                        value={viewType}
                        optionType="button"
                        onChange={x => { changeViewType(x.target.value as ViewType) }}/>

           <Radio.Group options={gutterTypeOptions}
                        value={gutterType}
                        optionType="button"
                        onChange={x => { changeGutterType(x.target.value as GutterType) }}/>
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

  function changeViewType(type: ViewType): void {
    setViewType(type)
    localStorage.setItem(LocalStorageKeys.diffViewType, type as string)
  }

  function changeGutterType(type: GutterType): void {
    setGutterType(type)
    localStorage.setItem(LocalStorageKeys.diffGutterType, type as string)
  }

}