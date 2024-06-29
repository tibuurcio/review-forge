import {Flex} from '@mparticle/aquarium'
import {Predictions} from '../constants/Predictions.ts'
import {useReviewStore} from '../stores/ReviewStore.ts'
import {ReviewPrediction} from './ReviewPrediction.tsx'

export function ReviewPredictions() {
  const { diff } = useReviewStore()

  return <>
    {diff &&
     <Flex className="reviewPredictions" gap="middle">
       {Predictions.map(prediction => <ReviewPrediction prediction={prediction} key={prediction.id}/>)}
     </Flex>}
  </>

}