# Review Forge Welcome Page!

Turning code review into developer joy


## Configure the app
- create a `.env` file in the root of the project
  - create a [github access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)
    - add OCTOKIT_SECRET_KEY=PUT_TOKEN_HERE to the `.env` file
  - create an openai account and retrieve two keys one for Org and one for Project
  - add those to `.env` file as OPENAI_ORG_KEY and OPENAI_PROJECT_KEY 

## Running the app
- Start the Frontend
  - open a terminal running node 20+
  - `npm i && npm run dev`

- Start the Backend
  - open a terminal running node 20+
  - `cd src/server && npm i && npx tsc && node dist/app.js`