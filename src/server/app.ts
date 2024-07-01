import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods'
import axios from 'axios'
import cors from 'cors'
import express from 'express'
import {Octokit} from 'octokit'
import 'dotenv/config'
import OpenAI from 'openai'

const BACKEND_PORT = 5678 as const
const FRONTEND_PORT = 5173 as const

const app = configureApp()

app.get('/reviewDiff/:pull_url', async (req: express.Request, res: express.Response) => {
  let owner: string
  let repo: string
  let pull_number: string

  const parsedUrl = parseGithubUrl(req.params.pull_url)

  if (parsedUrl) {
    ({ owner, repo, pull_number } = parsedUrl)
  } else {
    res.status(404).send('Invalid GitHub URL')
  }


  const octokit = new Octokit({ auth: process.env.OCTOKIT_SECRET_KEY })

  const { data: prData } = await octokit.rest.pulls.get({
                                                          owner,
                                                          repo,
                                                          pull_number
                                                        } as unknown as RestEndpointMethodTypes['pulls']['get']['parameters'])

  const { data: diff } = await axios.get(prData.diff_url)

  res.send(diff)

  function parseGithubUrl(url: string): { owner: string; repo: string; pull_number: string } | undefined {
    // Regular expression to match valid GitHub pull request URLs
    const regex = /^https:\/\/github\.com\/([\w-]+)\/([\w-]+)\/pull\/(\d+)$/i
    const match: RegExpMatchArray | null = url.match(regex)

    if (!match) return // Check for a valid match

    // Destructure captured groups and cast to specific types
    const { 1: owner, 2: repo, 3: pull_number } = match

    return { owner, repo, pull_number }
  }
})


app.get('/assist/:predictionId', async (req: express.Request, res: express.Response) => {
  const predictionId: string = req.params.predictionId
  const prediction = Predictions.find(prediction => prediction.id === predictionId)
  if (!prediction) return res.status(404).send('Prediction not found')

  const openai = new OpenAI({
                              organization: process.env.OPENAI_ORG_KEY,
                              project: process.env.OPENAI_PROJECT_KEY,
                            })

  const completion = await openai.chat.completions.create({
                                                            messages: [
                                                              {
                                                                role: 'system',
                                                                content: 'You are an expert professional software engineer, specializing in modern frontend technologies and React. Your task is to provide a clear and concise code review for the provided diff'
                                                              },
                                                              { role: 'user', content: prediction.prompt }
                                                            ],
                                                            model: 'gpt-3.5-turbo',
                                                          })

  const content = completion.choices[0].message.content

  res.send(content)
})


function configureApp(): express.Application {
  const app = express()
  const PORT = process.env.PORT || BACKEND_PORT.toString()

  app.use(cors({ origin: '*'/*`http://localhost:${FRONTEND_PORT}`*/ }))
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })

  return app
}


interface Prediction {
  id: string
  prompt: string
}

export const Predictions: Prediction[] = [
  {
    id: 'summary',
    prompt: 'Generate a summary of this Pull Request Diff',
  },
  {
    id: 'issues',
    prompt: 'Identify areas of issue in this Pull Request Diff',
  },
  {
    id: 'testing',
    prompt: 'What things should a tester/reviewer look for in this Pull Request Diff',
  },
  {
    id: 'performance',
    prompt: 'Identify key performance issues in this Pull Request Diff',
  },
  {
    id: 'security',
    prompt: 'How secure on a scale of 1-10 is this Pull Request Diff',
  },
]