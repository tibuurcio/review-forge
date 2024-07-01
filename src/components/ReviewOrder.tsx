import {Button, Checkbox, Typography, Flex, Space} from '@mparticle/aquarium'
import {Margin, MarginSm} from '@mparticle/aquarium/dist/style.ts'
import {useState} from 'react'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export function ReviewOrder() {
  const { fileOrder, diff, fileOrderReason } = useReviewStore()

  const [isShowingOrder, setIsShowingOrder] = useState<boolean>()

  return <>
    {fileOrder && diff &&
     <Flex vertical className="reviewOrder">

       <span>
         <Flex align="baseline" gap={MarginSm}>
           <Button onClick={e => setIsShowingOrder(!isShowingOrder)}>
            <Typography.Text>{isShowingOrder ? 'Hide' : 'View'} File Order</Typography.Text>
           </Button>
           {isShowingOrder &&
            <Typography.Text type="secondary">This is the suggested review order:</Typography.Text>}
         </Flex>

         {isShowingOrder &&
          <Typography.Title level={4} type="secondary" style={{ marginTop: 0 }}>{fileOrderReason}</Typography.Title>}

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
