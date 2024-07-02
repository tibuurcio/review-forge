import {Checkbox, Flex, Typography} from '@mparticle/aquarium'
import {MarginSm} from '@mparticle/aquarium/dist/style.ts'
import {useReviewStore} from 'src/stores/ReviewStore.ts'

export function ReviewOrder() {
  const { fileOrder, diff, fileOrderReason, isShowingOrder } = useReviewStore()

  return <>
    {fileOrder && diff &&
     <Flex vertical className="reviewOrder">

       <span>
         <Flex align="baseline" gap={MarginSm}>
           <Typography.Text type="secondary">This is the suggested review order:</Typography.Text>
         </Flex>

         <Typography.Title level={4} type="secondary" style={{ marginTop: 0 }}>{fileOrderReason}</Typography.Title>

         <div className="reviewFiles__checkboxScroll">
           <Checkbox.Group className="reviewFiles__checkboxGroup"
                           options={fileOrder.map(fileName => ({ label: fileName, value: fileName }))}/>
         </div>
       </span>

     </Flex>}
  </>
}
