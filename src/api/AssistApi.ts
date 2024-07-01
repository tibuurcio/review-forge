import {BaseApi} from 'src/api/BaseApi.ts'

export const AssistApi = {
  getPrediction,
} as const

async function getPrediction(predictionId: string): Promise<string> {
  return await BaseApi.get(`assist/${predictionId}`)
}