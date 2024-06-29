import {Space} from '@mparticle/aquarium'
import {ReviewInput} from 'src/components/ReviewInput.tsx'
import {ReviewDiff} from 'src/components/ReviewDiff.tsx'
import {ReviewPredictions} from 'src/components/ReviewPredictions.tsx'

export const AppContent = () => {
  return <>
    <div className="app__content">

      <Space direction="vertical" style={{width:'100%',height:'100%'}} size="large">
        <ReviewInput/>
        <ReviewDiff/>
        <ReviewPredictions/>
      </Space>
    </div>
  </>
}