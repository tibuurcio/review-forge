import {BaseApi} from 'src/api/BaseApi.ts'
import {AssistedCommentsResponse} from 'src/interfaces/AssistedCommentsResponse'

export const AssistApi = {
  getPrediction,
  getAiComments,
  analyzePR,
} as const

async function getPrediction(predictionId: string): Promise<string> {
  return await BaseApi.get(`assist/${predictionId}`)
}

async function getAiComments(reviewLink: string): Promise<AssistedCommentsResponse> {
  // const url = 'analyze'
  // // const url = 'comment'
  // const query = `url=${reviewLink}&reload=true`
  // const body = {}

  // return await BaseApi.post<{ component: string, payload: AssistedCommentsResponse }[]>(url, query, body)
  //   .then(data => {
  //     let insightsComponent = data.find(d => d.component === 'insights')
  //     return JSON.parse(insightsComponent?.payload as any) as AssistedCommentsResponse
  //   })
  // return await BaseApi.get(`comments`)


  return Promise.resolve({
    "summary": "This pull request includes changes related to updating the version to 1.17.0-ups-configurable-cookie.2 and some modifications in the package-lock.json, package.json, user-preferences-service.spec.ts, user-preferences.ts, and Cookies.ts files.",
    "orderingReason": "The order of the files is based on their relevance and potential impact on the project. The package-lock.json and package.json changes are placed first as they indicate the version update. Then, the user-preferences-service.spec.ts, user-preferences.ts, and Cookies.ts files are placed to address the implementation and usage of the cookie-related changes.",
    "files": [
      {
        "diffFile": "package-lock.json",
        "comments": [
          {
            "comment": "The package-lock.json file shows an update in the version from 1.16.1 to 1.17.0-ups-configurable-cookie.2. It's important to ensure that all the dependencies and their versions are correctly updated and aligned with this new version.",
            "lineContent": "  \"version\": \"1.17.0-ups-configurable-cookie.2\","
          }
        ]
      },
      {
        "diffFile": "package.json",
        "comments": [
          {
            "comment": "Similar to the package-lock.json, the package.json file also reflects the version update to 1.17.0-ups-configurable-cookie.2. It's crucial to verify that the version is consistent across these two files and that any additional configurations related to this version update are properly handled.",
            "lineContent": "  \"version\": \"1.17.0-ups-configurable-cookie.2\","
          }
        ]
      },
      {
        "diffFile": "src/services/user-preferences/user-preferences-service.spec.ts",
        "comments": [
          {
            "comment": "The file includes multiple modifications related to the usage of cookie keys. It's important to review these changes and ensure that the cookie keys are being utilized correctly and consistently throughout the service.",
            "lineContent": "        () => new Date(),"
          },
          {
            "comment": "The modifications related to the usage of cookie keys should be carefully reviewed to maintain the integrity and security of user preferences.",
            "lineContent": "        cookieKey,"
          }
        ]
      },
      {
        "diffFile": "src/services/user-preferences/user-preferences.ts",
        "comments": [
          {
            "comment": "The changes in this file involve the usage of cookie-related functionalities. It's important to ensure that the modifications related to cookies are aligned with best practices and do not introduce any security vulnerabilities.",
            "lineContent": "import * as Cookies from 'src/utils/Cookies'"
          },
          {
            "comment": "The addition of the cookieOptions parameter and the removal of the cookieKey parameter should be carefully reviewed to understand the impact on the functionality and security of user preferences.",
            "lineContent": "public dateFormatter: () => Date,"
          }
        ]
      },
      {
        "diffFile": "src/utils/Cookies.ts",
        "comments": [
          {
            "comment": "The addition of the type-fest import and the usage of the CookieOptions type should be reviewed to ensure that the cookie-related functionalities are well-typed and aligned with the latest standards.",
            "lineContent": "import { RequireOneOrNone } from 'type-fest'"
          },
          {
            "comment": "The calculateExpires function should be carefully reviewed to ensure that the expiration logic for cookies is implemented correctly and adheres to the expected behavior.",
            "lineContent": "function calculateExpires(value: string | null, permanent?: boolean, expires?: string): string {"
          }
        ]
      }
    ]
  } as AssistedCommentsResponse)
}

async function analyzePR(reviewLink: string): Promise<{ component: string, payload: string }[]> {
  const url = 'analyze'
  const query = `url=${reviewLink}&reload=true`
  const body = {}

  return await BaseApi.post(url, query, body)
}
