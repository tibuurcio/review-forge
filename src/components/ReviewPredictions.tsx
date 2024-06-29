import {Flex} from '@mparticle/aquarium'
import {Predictions} from 'src/constants/Predictions.ts'
import {useReviewStore} from 'src/stores/ReviewStore.ts'
import {ReviewPrediction} from 'src/components/ReviewPrediction.tsx'

export function ReviewPredictions() {
  const { diff } = useReviewStore()

  return <>
    {diff &&
     <Flex className="reviewPredictions" gap="middle">
       {Predictions.map(prediction => <ReviewPrediction prediction={prediction} key={prediction.id}/>)}
     </Flex>}
  </>

}