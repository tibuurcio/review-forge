import {Button, Checkbox, Typography, Flex, Space} from '@mparticle/aquarium'
import {Margin, MarginSm} from '@mparticle/aquarium/dist/style.ts'
import {useState} from 'react'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export function ReviewOrder() {
  const { fileOrder, diff } = useReviewStore()

  const [isShowingOrder, setIsShowingOrder] = useState<boolean>()

  return <>
    {fileOrder && diff &&
     <Flex vertical className="reviewOrder">

       <span>
         <Flex align="baseline" gap={MarginSm}>
         <Button onClick={e => setIsShowingOrder(!isShowingOrder)}
                 style={{ marginBottom: Margin }}>
           {isShowingOrder ? 'Hide' : 'View'} File Order
         </Button>
           {isShowingOrder &&
            <Typography.Text type="secondary">This is the suggested order to review and understand this PR:</Typography.Text>}
         </Flex>

         {isShowingOrder && <>
           <div className="reviewFiles__checkboxScroll">
             <Checkbox.Group className="reviewFiles__checkboxGroup"
                             options={fileOrder.map(fileName => ({ label: fileName, value: fileName }))}/>
           </div>
         </>}
       </span>

     </Flex>}
  </>
}
