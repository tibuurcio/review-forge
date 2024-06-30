import {Flex} from '@mparticle/aquarium'
import {Predictions} from 'src/constants/Predictions.ts'
import {useReviewStore} from 'src/stores/ReviewStore.ts'
import {PredictionCard} from 'src/components/PredictionCard.tsx'

export function ReviewPredictions() {
  const { diff } = useReviewStore()

  return <>
    {diff &&
     <Flex className="reviewPredictions" gap="middle">
       {Predictions.map(prediction => <PredictionCard prediction={prediction} key={prediction.id}/>)}
     </Flex>}
  </>

}