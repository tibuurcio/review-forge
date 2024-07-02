import {Button, Flex, Radio, Typography} from '@mparticle/aquarium'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {Diff, FileData, getChangeKey, GutterOptions, GutterType, Hunk, parseDiff, ViewType} from 'react-diff-view'
import {AssistApi} from 'src/api/AssistApi.ts'
import DiffCommentTrigger from 'src/components/Diff/DiffCommentTrigger.tsx'
import {LocalStorageKeys} from 'src/constants/LocalStorageKeys.ts'
import {useDiffComments} from 'src/hooks/useDiffComments.ts'
import {useLocalStorage} from 'src/hooks/useLocalStorage.tsx'
import {AssistedCommentsResponse} from 'src/interfaces/AssistedCommentsResponse'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export function ReviewDiff() {
  const { diff, fileOrder, isShowingDiff, setFileOrder, setFileOrderReason } = useReviewStore()

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


  useEffect(() => { addAiComments() }, [diff])

  return <>
    {diff &&
     <Flex vertical className="reviewDiff">

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
      <Flex align="center" justify="space-between" className="reviewDiff__fileName">
        <Typography.Text type="secondary">Old Path - {file.oldPath}</Typography.Text>
        <Typography.Text type="secondary">New Path - {file.newPath}</Typography.Text>
      </Flex>

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

    let aiCommentWidgets: Record<string, React.ReactElement[]> = {}

    // files.forEach(file => {
    //   aiCommentWidgets = comments.reduce<Record<string, ReactElement[]>>(
    //     (widgets, comment) => {
    //       if (!widgets[comment.changeKey]) widgets[comment.changeKey] = []
    //
    // debugger
    //       const fileName = file.newPath
    //
    //       const isAiComment = comment.content.startsWith(fileName)
    //       const message = comment.content.replace(fileName, '')
    //
    //       //todo: something strange is going on here, not working as expected
    //       if (!isAiComment) {
    //         widgets[comment.changeKey].push(<DiffAiComment message={message}/>)
    //       }
    //
    //       return widgets
    //     }, {})
    // })

    return aiCommentWidgets
  }


  async function addAiComments(): Promise<void> {
    if (!diff) return

    const response = await AssistApi.getAiComments() as string
    const assistedCommentsResponse = JSON.parse(response.substr(8, response.length - 12)) as AssistedCommentsResponse

    const fileOrder = assistedCommentsResponse.files.map(file => file.newPath)

    setFileOrder(fileOrder)

    setFileOrderReason(assistedCommentsResponse.orderingReason)


    assistedCommentsResponse.files.forEach(file => {
      file.comments.forEach(comment => {
        const content = file.newPath + comment.comment
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
