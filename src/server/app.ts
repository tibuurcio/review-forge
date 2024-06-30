import axios from 'axios'
import cors from 'cors'
import express from 'express'
import {Octokit} from 'octokit'
import 'dotenv/config'

const BACKEND_PORT = 5678 as const
const FRONTEND_PORT = 5173 as const

const app = configureApp()

app.get('/reviewDiff/:pull_number', async (req: express.Request, res: express.Response) => {
  const pull_number: number = +req.params.pull_number

  const octokit = new Octokit({ auth: process.env.OCTOKIT_SECRET_KEY })

  const { data: prData } = await octokit.rest.pulls.get(
    {
      owner: 'facebook',
      repo: 'react',
      pull_number
    })

  const { data: diff } = await axios.get(prData.diff_url)

  res.send(diff)
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