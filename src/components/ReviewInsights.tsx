import {Button, Center, Collapse, ICollapseProps, Result, Skeleton, Typography} from '@mparticle/aquarium'
import {MpBrandSecondary3} from '@mparticle/aquarium/dist/style.ts'
import {useState} from 'react'
import {AssistApi} from 'src/api/AssistApi.ts'
import {Insight, InsightTypes} from 'src/constants/InsightTypes.ts'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export function ReviewInsights() {
  const { diff } = useReviewStore()

  return <>
    {diff &&
     <Collapse
       bordered={false}
       style={{ background: 'white' }}
       items={getItems()}
     />}
  </>

  function getItems(): ICollapseProps['items'] {
    return InsightTypes.map(insight => {
      const [isInsightLoading, setIsInsightLoading] = useState<boolean>(false)
      const [isInsightError, setIsInsightError] = useState<boolean>(false)
      const [aiInsight, setAiInsight] = useState<string>()

      return {
        key: insight.id,
        className: 'reviewInsights__item',
        onClick: loadInsight,
        label: <InsightLabel/>,
        children: <InsightBody/>,
        style: {
          marginBottom: 24,
          background: MpBrandSecondary3,
          borderRadius: 6,
          border: 'none',
        },
      }

      function InsightLabel() {
        return (<>
          <Typography.Text strong>{insight.display} insights</Typography.Text>
        </>)
      }

      function InsightBody() {
        if (isInsightLoading) return <Center><Skeleton/></Center>

        if (isInsightError) {
          return <Result status="error" title="Something went wrong, please try again later."
                         extra={<Button onClick={e => { loadInsight() }}>Reload {insight.display} insights</Button>}/>
        }

        return <Typography.Text>{aiInsight}</Typography.Text>
      }

      async function loadInsight(): Promise<void> {
        if (aiInsight) return

        setIsInsightLoading(true)
        setIsInsightError(false)

        try {
          const response = await AssistApi.getInsight(insight.id)
          setAiInsight(response)

        } catch (e) {
          setIsInsightError(true)
        } finally {
          setIsInsightLoading(false)
        }
      }

    })
  }

}
