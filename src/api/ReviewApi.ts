import {BaseApi} from 'src/api/BaseApi.ts'

export const ReviewApi = {
  getDiff,
} as const

async function getDiff(reviewLink: string): Promise<string> {
  return await BaseApi.get('reviewDiff/' + reviewLink)
}