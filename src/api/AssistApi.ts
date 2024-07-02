import {BaseApi} from 'src/api/BaseApi.ts'
import {AssistedCommentsResponse} from 'src/interfaces/AssistedCommentsResponse'

export const AssistApi = {
  getPrediction,
  getAiComments,
} as const

async function getPrediction(predictionId: string): Promise<string> {
  return await BaseApi.get(`assist/${predictionId}`)
}

async function getAiComments(): Promise<AssistedCommentsResponse> {
  return await BaseApi.get(`comments`)
}
