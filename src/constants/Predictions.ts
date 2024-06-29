import type {Prediction} from 'src/constants/Prediction.ts'

export const Predictions: Prediction[] = [
  {
    id: 'summary',
    display: 'Summary',
    prompt: 'Generate a summary of this Pull Request Diff',
  },
  {
    id: 'issues',
    display: 'Issues',
    prompt: 'Identify areas of issue in this Pull Request Diff',
  },
  {
    id: 'testing',
    display: 'Testing',
    prompt: 'What things should a tester/reviewer look for in this Pull Request Diff',
  },
  {
    id: 'performance',
    display: 'Performance',
    prompt: 'Identify key performance issues in this Pull Request Diff',
  },
  {
    id: 'security',
    display: 'Security',
    prompt: 'How secure on a scale of 1-10 is this Pull Request Diff',
  },
]