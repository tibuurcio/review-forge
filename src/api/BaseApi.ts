import axios from 'axios'

export const BaseApi = {
  get,
} as const

export const serverRoute = `http://localhost:5678` as const

async function get<T>(endpoint: string, query: string = ''): Promise<T> {
  const url = endpoint + (query ? `${encodeURIComponent(query)}` : '')
  const response = await axios.get(`${serverRoute}/${url}`)
  if (response.status === 200) {
    return response.data
  } else {
    throw new Error('Failed to fetch: ' + endpoint)
  }
}