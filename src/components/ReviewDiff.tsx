import {Button, Flex, Radio, Typography} from '@mparticle/aquarium'
import {Padding} from '@mparticle/aquarium/dist/style.ts'
import {ReactElement, useCallback, useEffect, useMemo, useState} from 'react'
import {Diff, FileData, getChangeKey, GutterOptions, GutterType, Hunk, parseDiff, ViewType} from 'react-diff-view'
import {DiffAiComment} from 'src/components/Diff/DiffAiComment.tsx'
import DiffCommentTrigger from 'src/components/Diff/DiffCommentTrigger.tsx'
import {AiCommentMock} from 'src/constants/AiCommentMock.ts'
import {LocalStorageKeys} from 'src/constants/LocalStorageKeys.ts'
import {useDiffComments} from 'src/hooks/useDiffComments.ts'
import {useLocalStorage} from 'src/hooks/useLocalStorage.tsx'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export function ReviewDiff() {
  const { diff, fileOrder, setFileOrder, setFileOrderReason } = useReviewStore()

  const [isShowingDiff, setIsShowingDiff] = useState<boolean>()

  const [viewType, setViewType] = useLocalStorage<ViewType>(LocalStorageKeys.diffViewType, 'split')
  const [gutterType, setGutterType] = useLocalStorage<GutterType>(LocalStorageKeys.diffGutterType, 'anchor')

  const files = parseDiff(diff).sort(sortByFileOrder)


  const viewTypeOptions = [
    { label: 'Split', value: 'split' },
    { label: 'Unified', value: 'unified' }]

  const gutterTypeOptions = [
    { label: 'None', value: 'none' },
    { label: 'Anchor', value: 'anchor' }]

  const [comments, { addComment, editComment, saveEdit, cancelEdit, deleteComment }] = useDiffComments()

  const renderGutter = useCallback(generateRenderGutter,
                                   [addComment, viewType])

  const diffWidgets = useMemo(() => generateDiffWidgets(files),
                              [comments, saveEdit, editComment, cancelEdit, deleteComment])


  useEffect(addAiComments, [diff])

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


  function renderFile(file: FileData) {
    const { oldRevision, newRevision, type, hunks } = file
    return (<>
      <Typography.Text className="reviewDiff__fileName" type="secondary">New Path - {file.newPath}</Typography.Text>
      <Diff key={oldRevision + '-' + newRevision}
            viewType={viewType}
            diffType={type}
            hunks={hunks}
            gutterType={gutterType}
            generateAnchorID={generateAnchorID}
            renderGutter={renderGutter}
            widgets={diffWidgets}>
        {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk}/>)}
      </Diff>
    </>)
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

  function generateDiffWidgets(files: FileData[]) {

    let aiCommentWidgets: Record<string, React.ReactElement[]>

    files.forEach(file => {

      aiCommentWidgets = comments.reduce<Record<string, ReactElement[]>>(
        (widgets, comment) => {
          if (!widgets[comment.changeKey]) widgets[comment.changeKey] = []

          const fileName = file.newPath

          const isAiComment = comment.content.startsWith(fileName)
          const message = comment.content.replace(fileName, '')

          //todo: something strange is going on here, not working as expected
          if (!isAiComment) {
            widgets[comment.changeKey].push(<DiffAiComment message={message}/>)
          }

          return widgets
        }, {})
    })

    return aiCommentWidgets
  }


  function addAiComments(): void {
    if (!diff) return

    const assistedCommentsResponse = AiCommentMock


    const fileOrder = assistedCommentsResponse.files.map(file => file.diffFile[0])
    setFileOrder(fileOrder)

    setFileOrderReason(assistedCommentsResponse.orderingReason)


    assistedCommentsResponse.files.forEach(file => {
      file.comments.forEach(comment => {
        // const fileName = extractFilenameFromDiffName(file.diffFile) as string
        const content = file.diffFile[0] + comment.comment

        postGeneratedComment(comment.lineNumber, content)
      })
    })


    function postGeneratedComment(lineNumber: number, content: string) {
      const changeKey = getChangeKey({
                                       type: 'normal',
                                       content: content,// add file name
                                       newLineNumber: lineNumber,
                                       oldLineNumber: lineNumber,
                                       isNormal: true
                                     })
      addComment(changeKey, content)
    }
  }

  function sortByFileOrder(a: FileData, b: FileData) {
    return fileOrder.indexOf(a.newPath) - fileOrder.indexOf(b.newPath)
  }

}
