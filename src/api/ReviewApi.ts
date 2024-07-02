import {BaseApi} from 'src/api/BaseApi.ts'

export const ReviewApi = {
  getDiff,
} as const

async function getDiff(reviewLink: string): Promise<string> {
  const endpoint = 'diff'
  const query = `url=${reviewLink}`
  return BaseApi.get(endpoint, query)
}
