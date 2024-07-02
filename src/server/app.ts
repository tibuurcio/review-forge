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
    return res.status(404).send('Invalid GitHub URL')
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
  if (!prediction) { return res.status(404).send('Prediction not found')}

  const openai = new OpenAI({
                              organization: process.env.OPENAI_ORG_KEY,
                              project: process.env.OPENAI_PROJECT_KEY,
                            })

  const response = await openai.chat.completions.create({
                                                          messages: [
                                                            {
                                                              role: 'system',
                                                              content: 'You are an expert professional software engineer, specializing in modern frontend technologies and React. Your task is to provide a clear and concise code review for the provided diff'
                                                            },
                                                            { role: 'user', content: prediction.prompt }
                                                          ],
                                                          model: 'gpt-3.5-turbo',
                                                        })

  const content = response.choices[0].message.content

  res.send(content)
})


app.get('/comments', async (req: express.Request, res: express.Response) => {
  return res.send(aiCommentsMock)
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

const aiCommentsMock = `"\`\`\`json
{
  "summary": "This pull request includes changes related to version updates, new features, and cookie management in the aquarium project.",
  "orderingReason": "The files are ordered based on their impact and dependency, starting with the changelog to understand the high-level changes, followed by package-lock.json, package.json, and then the source code changes related to user preferences and cookie management.",
  "files": [
    {
      "oldPath": "CHANGELOG.md",
      "newPath": "CHANGELOG.md",
      "comments": [
        {
          "lineNumber": 1,
          "comment": "Consider adding more details to the changelog entries to provide a clear understanding of the changes introduced in each version.",
          "type": "performance-improvements"
        }
      ]
    },
    {
      "oldPath": "package-lock.json",
      "newPath": "package-lock.json",
      "comments": [
        {
          "lineNumber": 13,
          "comment": "The type-fest package has been updated to version 4.20.0. Ensure that this update does not introduce any breaking changes or compatibility issues with other dependencies.",
          "type": "performance-improvements"
        }
      ]
    },
    {
      "oldPath": "package.json",
      "newPath": "package.json",
      "comments": [
        {
          "lineNumber": 6,
          "comment": "Confirm that the version update to 1.17.0-ups-configurable-cookie.2 aligns with the changes made in this PR and does not conflict with other package versions.",
          "type": "performance-improvements"
        }
      ]
    },
    {
      "oldPath": "src/services/user-preferences/user-preferences-service.spec.ts",
      "newPath": "src/services/user-preferences/user-preferences-service.spec.ts",
      "comments": [
        {
          "lineNumber": 51,
          "comment": "Consider updating the tests to reflect the changes made in the User Preferences Service.",
          "type": "performance-improvements"
        }
      ]
    },
    {
      "oldPath": "src/services/user-preferences/user-preferences.ts",
      "newPath": "src/services/user-preferences/user-preferences.ts",
      "comments": [
        {
          "lineNumber": 1,
          "comment": "Ensure that the import paths for 'src/utils/Cookies' and 'type-fest' are accurate after the changes made in this PR.",
          "type": "performance-improvements"
        },
        {
          "lineNumber": 43,
          "comment": "Verify that the 'expiresISOString' and 'permanent' options are correctly handled in the put method to manage cookie expiration.",
          "type": "performance-improvements"
        }
      ]
    },
    {
      "oldPath": "src/utils/Cookies.ts",
      "newPath": "src/utils/Cookies.ts",
      "comments": [
        {
          "lineNumber": 1,
          "comment": "Consider adding JSDoc comments to describe the purpose and usage of the 'calculateExpires' function.",
          "type": "performance-improvements"
        }
      ]
    }
  ]
}
\`\`\`"` as const
