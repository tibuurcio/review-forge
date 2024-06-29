import {Card, Center, Flex, Spin, Typography} from '@mparticle/aquarium'
import {useEffect, useState} from 'react'
import {Prediction} from '../constants/Prediction.ts'

interface PredictionProps {
  prediction: Prediction
}

export function ReviewPrediction(props: PredictionProps) {
  const [isLoadingPrediction, setIsLoadingPrediction] = useState<boolean>(true)

  useEffect(() => { init() }, [])
  
  return <>
    <div className="reviewPrediction">
      <Card title={props.prediction.display}>
        {isLoadingPrediction ? <Center><Spin/></Center> :
         <Typography.Text>{props.prediction.prompt}</Typography.Text>}
      </Card>
    </div>
  </>


  async function init() {
    const randomTime = Math.floor(Math.random() * 3000) + 1000
    setTimeout(() => { setIsLoadingPrediction(false) }, randomTime)
  }
}