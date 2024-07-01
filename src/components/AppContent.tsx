import {Space} from '@mparticle/aquarium'
import {ReviewDiff} from 'src/components/ReviewDiff.tsx'
import {ReviewInput} from 'src/components/ReviewInput.tsx'
import {ReviewOrder} from 'src/components/ReviewOrder.tsx'
import {ReviewPredictions} from 'src/components/ReviewPredictions.tsx'

export const AppContent = () => {
  return <>
    <div className="app__content">

      <Space direction="vertical" style={{ width: '100%', height: '100%' }} size="large">
        <ReviewInput/>
        <ReviewDiff/>
        <ReviewOrder/>
        <ReviewPredictions/>
      </Space>
    </div>
  </>
}
