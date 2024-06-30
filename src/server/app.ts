import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods'
import axios from 'axios'
import cors from 'cors'
import express from 'express'
import {Octokit} from 'octokit'
import 'dotenv/config'

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
    throw new Error('Invalid GitHub URL')
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

function configureApp(): express.Application {
  const app = express()
  const PORT = process.env.PORT || BACKEND_PORT.toString()

  app.use(cors({ origin: `http://localhost:${FRONTEND_PORT}` }))
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })

  return app
}