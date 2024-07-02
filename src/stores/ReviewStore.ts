import {create} from 'zustand'

export const useReviewStore = create(set => ({
  link: '',
  setLink: (link: string) => set({ link }),

  diff: '',
  setDiff: (diff: string) => set({ diff }),

  isShowingDiff: '',
  setIsShowingDiff: (isShowingDiff: boolean) => set({ isShowingDiff }),

  isShowingOrder: '',
  setIsShowingOrder: (isShowingOrder: boolean) => set({ isShowingOrder }),

  isShowingSummary: '',
  setIsShowingSummary: (isShowingSummary: boolean) => set({ isShowingSummary }),

  fileOrder: [] as string[],
  setFileOrder: (fileOrder: string[]) => set({ fileOrder }),

  fileOrderReason: '',
  setFileOrderReason: (fileOrderReason: string) => set({ fileOrderReason }),
}))
