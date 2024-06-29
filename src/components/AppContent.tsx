import {Space} from '@mparticle/aquarium'
import {ReviewInput} from './ReviewInput.tsx'
import {ReviewDiff} from './ReviewDiff.tsx'
import {ReviewPredictions} from './ReviewPredictions.tsx'

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