import {ReviewInput} from './ReviewInput.tsx'
import {ReviewDiff} from './ReviewDiff.tsx'

export const AppContent = () => {
  return <>
    <div className="app__content">

      <ReviewInput/>
      
      <ReviewDiff/>

    </div>
  </>
}