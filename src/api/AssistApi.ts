import axios from 'axios'
import {BaseApi} from 'src/api/BaseApi.ts'
import {AssistedCommentsResponse} from 'src/interfaces/AssistedCommentsResponse'

export const AssistApi = {
  getPrediction,
  getAiComments,
  analyzePR,
} as const

async function getPrediction(predictionId: string): Promise<string> {
  return await BaseApi.get(`assist/${predictionId}`)
}

async function getAiComments(): Promise<AssistedCommentsResponse> {
  return await BaseApi.get(`comments`)
}

async function analyzePR(reviewLink: string): Promise<{ component: string, payload: string }[]> {
  return await axios.post(`http://34.138.3.116:8080/analyze?url=${reviewLink}`)
}
