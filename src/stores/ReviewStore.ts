import {create} from 'zustand'

export const useReviewStore = create(set => ({
  link: '',
  setLink: (link: string) => set({ link }),

  diff: '',
  setDiff: (diff: string) => set({ diff }),

  fileOrder: [] as string[],
  setFileOrder: (fileOrder: string[]) => set({ fileOrder }),

  fileOrderReason: '',
  setFileOrderReason: (fileOrderReason: string) => set({ fileOrderReason }),
}))
