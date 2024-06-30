import {Input, Typography} from '@mparticle/aquarium'
import axios from 'axios'
import {useState} from 'react'
import {ReviewApi} from 'src/api/ReviewApi.ts'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export function ReviewInput() {
  const [isFetching, setIsFetching] = useState<boolean>()
  const [isInputError, setIsInputError] = useState<boolean>()
  const [isFetchingError, setIsFetchingError] = useState<boolean>()

  const { link: reviewLink } = useReviewStore()
  const setReviewLink = useReviewStore(state => state.setLink)
  const setReviewDiff = useReviewStore(state => state.setDiff)

  return <>
    <div className="reviewInput__wrapper">
      <div className="reviewInput__label">Enter a pull request url to review</div>
      <Input.Search className="reviewInput__input"
                    size="large"
                    autoFocus
                    enterButton="Forge Review"
                    value={reviewLink}
                    loading={isFetching}
                    status={isInputError ? 'error' : undefined}
                    onChange={onChange}
                    onSearch={submit}/>

      {isFetchingError &&
       <Typography.Text type="danger">Error fetching review</Typography.Text>}
    </div>
  </>

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setReviewLink(e.target.value)
    setIsInputError(false)
  }

  async function submit(): Promise<void> {
    if (!reviewLink) {
      setIsInputError(true)
      return
    }

    setIsFetching(true)
    setIsFetchingError(false)

    try {
      await fetchReview()
    } catch (e) {
      setIsFetchingError(true)
    } finally {
      setIsFetching(false)
    }
  }


  async function fetchReview(): Promise<void> {
    setReviewDiff(await ReviewApi.getDiff(reviewLink))
  }


}