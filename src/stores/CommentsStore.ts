import {AssistedCommentsResponse} from 'src/interfaces/AssistedCommentsResponse'
import {create} from 'zustand'

export const useCommentsStore = create(set => ({
  aiComments: undefined as AssistedCommentsResponse,
  setAiComments: (aiComments: AssistedCommentsResponse) => set({ aiComments }),
}))
