import {Card, Center, Spin, Typography} from '@mparticle/aquarium'
import {useEffect, useState} from 'react'
import type {Prediction} from 'src/constants/Prediction.ts'

interface PredictionProps {
  prediction: Prediction
}

export function PredictionCard(props: PredictionProps) {
  const [isLoadingPrediction, setIsLoadingPrediction] = useState<boolean>(true)

  useEffect(() => { init() }, [])

  return <>
    <Card title={props.prediction.display}
          className={'predictionCard'+(!isLoadingPrediction?' predictionCard--loaded':'')}>
      {isLoadingPrediction ? <Center><Spin/></Center> :
       <Typography.Text>{props.prediction.prompt}</Typography.Text>}
    </Card>
  </>


  async function init() {
    const randomTime = Math.floor(Math.random() * 1000) + 1000
    setTimeout(() => { setIsLoadingPrediction(false) }, randomTime)
  }
}