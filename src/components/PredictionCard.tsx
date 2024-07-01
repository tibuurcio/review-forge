import {Card, Center, Spin, Typography} from '@mparticle/aquarium'
import {useEffect, useState} from 'react'
import {AssistApi} from 'src/api/AssistApi.ts'
import type {Prediction} from 'src/constants/Prediction.ts'

interface PredictionProps {
  prediction: Prediction
}

export function PredictionCard(props: PredictionProps) {
  const [isLoadingPrediction, setIsLoadingPrediction] = useState<boolean>(true)
  const [prediction, setPrediction] = useState<string>()

  useEffect(() => { init() }, [])

  return <>
    <Card title={props.prediction.display}
          className={'predictionCard' + (!isLoadingPrediction ? ' predictionCard--loaded' : '')}>
      {isLoadingPrediction ? <Center><Spin/></Center> :
       <Typography.Text>{prediction}</Typography.Text>}
    </Card>
  </>


  async function init(): Promise<void> {
    const prediction = await AssistApi.getPrediction(props.prediction.id)
    setPrediction(prediction)
    setIsLoadingPrediction(false)
  }
}