import {Button, Space, Typography} from '@mparticle/aquarium'
import {ReviewDiff} from 'src/components/ReviewDiff.tsx'
import {ReviewInput} from 'src/components/ReviewInput.tsx'
import {ReviewOrder} from 'src/components/ReviewOrder.tsx'
import {ReviewSummary} from 'src/components/ReviewSummary.tsx'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export const AppContent = () => {
  const {
    diff,
    isShowingDiff,
    isShowingOrder,
    isShowingSummary,
    setIsShowingDiff,
    setIsShowingOrder,
    setIsShowingSummary
  } = useReviewStore()
  return <>
    <div className="app__content">

      <Space direction="vertical" style={{ width: '100%', height: '100%' }} size="large">
        <ReviewInput/>

        {diff && <span className="reviewDiff__diffControls">
          <Button onClick={e => setIsShowingDiff(!isShowingDiff)}>
            <Typography.Text>{isShowingOrder ? 'Hide' : 'View'} Diff</Typography.Text>
          </Button>

          <Button onClick={e => setIsShowingOrder(!isShowingOrder)}>
            <Typography.Text>{isShowingOrder ? 'Hide' : 'View'} File Order</Typography.Text>
          </Button>

          <Button onClick={e => setIsShowingSummary(!isShowingSummary)}>
            <Typography.Text>{isShowingSummary ? 'Hide' : 'View'} Prediction Summary</Typography.Text>
          </Button>
        </span>}

        {isShowingDiff && <ReviewDiff/>}
        {isShowingOrder && <ReviewOrder/>}
        {isShowingSummary && <ReviewSummary/>}
      </Space>
    </div>
  </>
}
