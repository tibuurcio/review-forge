import {BaseApi} from 'src/api/BaseApi.ts'
import {AssistedCommentsResponse} from 'src/interfaces/AssistedCommentsResponse'

export const AssistApi = {
  getInsight,
  getAiComments,
} as const

async function getInsight(reviewLink: string, insightId: string): Promise<string> {
  const endpoint = `analyze/${insightId}`
  const query = `url=${reviewLink}`
  return await BaseApi.get(endpoint, query)
}

async function getAiComments(reviewLink: string): Promise<AssistedCommentsResponse> {
  const url = 'comments'
  const query = `url=${reviewLink}&refresh=true`

  return await BaseApi.get<AssistedCommentsResponse>(url, query)
}

async function analyzePR(reviewLink: string): Promise<{ component: string, payload: string }[]> {
  const url = 'analyze'
  const query = `url=${reviewLink}&refresh=true`
  const body = {}

  return await BaseApi.post(url, query, body)
  // const endpoint = 'comments'
  // const query = `url=${reviewLink}&reload=true`
  // return await BaseApi.get(endpoint, query)
}
