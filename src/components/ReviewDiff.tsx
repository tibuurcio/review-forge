import {Button, Flex, Radio, Typography} from '@mparticle/aquarium'
import {ReactElement, useCallback, useMemo, useState} from 'react'
import {Diff, GutterOptions, GutterType, Hunk, parseDiff, ViewType} from 'react-diff-view'
import DiffCommentTrigger from 'src/components/Diff/DiffCommentTrigger.tsx'
import DiffComment from 'src/components/Diff/DiffComment.tsx'
import {LocalStorageKeys} from 'src/constants/LocalStorageKeys.ts'
import {useDiffComments} from 'src/hooks/useDiffComments.ts'
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

  const [comments, { addComment, editComment, saveEdit, cancelEdit, deleteComment }] = useDiffComments()

  const renderGutter = useCallback(generateRenderGutter,
                                   [addComment, viewType])

  const diffWidgets = useMemo(generateDiffWidgets,
                              [comments, saveEdit, editComment, cancelEdit, deleteComment])

  return <>
    {diff &&
     <Flex vertical className="reviewDiff">

       <span className="reviewDiff__diffControls">
         <Button onClick={e => setIsShowingDiff(!isShowingDiff)}>
           {isShowingDiff ? 'Hide' : 'View'} Diff
         </Button>

         {isShowingDiff && <>
           <div className="reviewDiff__diffControls">
             <div>
               <Typography.Text type="secondary">View Type: </Typography.Text>
               <Radio.Group options={viewTypeOptions}
                            value={viewType}
                            optionType="button"
                            onChange={e => { changeViewType(e.target.value as ViewType) }}/>
             </div>

             <div>
               <Typography.Text type="secondary">Gutter Type: </Typography.Text>
               <Radio.Group options={gutterTypeOptions}
                            value={gutterType}
                            optionType="button"
                            onChange={e => { changeGutterType(e.target.value as GutterType) }}/>
             </div>

           </div>
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
            generateAnchorID={generateAnchorID}
            renderGutter={renderGutter}
            widgets={diffWidgets}>
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

  function generateRenderGutter({ change, side, inHoverState, renderDefault, wrapInAnchor }: GutterOptions) {
    const canComment = inHoverState && (viewType === 'split' || side === 'new')
    if (canComment) return <DiffCommentTrigger change={change} onClick={addComment}/>
    return wrapInAnchor(renderDefault())
  }

  function generateDiffWidgets() {
    return comments.reduce<Record<string, ReactElement[]>>(
      (widgets, comment) => {
        if (!widgets[comment.changeKey]) widgets[comment.changeKey] = []
        widgets[comment.changeKey].push(
          <DiffComment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            state={comment.state}
            time={comment.time}
            onSave={saveEdit}
            onEdit={editComment}
            onCancel={cancelEdit}
            onDelete={deleteComment}/>)
        return widgets
      }, {}) as const
  }

}
