import {BaseApi} from 'src/api/BaseApi.ts'
import {AssistedCommentsResponse} from 'src/interfaces/AssistedCommentsResponse'

export const AssistApi = {
  getInsight,
  getAiComments,
} as const

async function getInsight(reviewLink: string, insightId: string): Promise<string> {
  const random = Math.round((Math.random())) % 10 === 0
  const endpoint = `analyze/${insightId}`
  const query = `url=${reviewLink}&refresh=${random}`
  return BaseApi.get(endpoint, query)
}

async function getAiComments(reviewLink: string): Promise<AssistedCommentsResponse> {
  const endpoint = 'comments'
  const query = `url=${reviewLink}`
  return BaseApi.get(endpoint, query)
}
