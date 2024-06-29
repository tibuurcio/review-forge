import {Input, Typography} from '@mparticle/aquarium'
import {useState} from 'react'

export function ReviewInput() {
  const [reviewLink, setReviewLink] = useState<string>('')
  const [isFetching, setIsFetching] = useState<boolean>()
  const [isInputError, setIsInputError] = useState<boolean>()
  const [isFetchingError, setIsFetchingError] = useState<boolean>()

  return <>
    <div className="reviewInput__wrapper">
      <div className="reviewInput__label">Enter a pull request url to review</div>
      <Input.Search className="reviewInput__input"
                    size="large"
                    enterButton="Review"
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

    try {
      await fetchReview()
    } catch (e) {
      setIsFetchingError(true)
    } finally {
      setIsFetching(false)
    }
  }

  async function fetchReview() {
    alert('Forging review for PR: ' + reviewLink)

  }


}