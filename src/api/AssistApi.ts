import {BaseApi} from 'src/api/BaseApi.ts'
import {AssistedCommentsResponse} from 'src/interfaces/AssistedCommentsResponse'

export const AssistApi = {
  getInsight,
  getAiComments,
} as const

async function getInsight(reviewLink: string, predictionId: string): Promise<string> {
  return await BaseApi.get(`analyze/${predictionId}`)
}

async function getAiComments(reviewLink: string): Promise<AssistedCommentsResponse> {
  const url = 'analyze'
  // const url = 'comment'
  const query = `url=${reviewLink}&reload=true`
  const body = {}

  return await BaseApi.post<{ component: string, payload: AssistedCommentsResponse }[]>(url, query, body)
    .then(data => {
      let insightsComponent = data.find(d => d.component === 'insights')
      return JSON.parse(insightsComponent?.payload as any) as AssistedCommentsResponse
    })
}
