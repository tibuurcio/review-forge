import {Input, Typography} from '@mparticle/aquarium'
import {useState} from 'react'
import {useReviewStore} from '../stores/ReviewStore.ts'

export function ReviewInput() {
  const [isFetching, setIsFetching] = useState<boolean>()
  const [isInputError, setIsInputError] = useState<boolean>()
  const [isFetchingError, setIsFetchingError] = useState<boolean>()

  const reviewLink = useReviewStore(state => state.link)
  const setReviewLink = useReviewStore(state => state.setLink)
  const setReviewDiff = useReviewStore(state => state.setDiff)

  return <>
    <div className="reviewInput__wrapper">
      <div className="reviewInput__label">Enter a pull request url to review</div>
      <Input.Search className="reviewInput__input"
                    size="large"
                    autoFocus
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

  async function fetchReview(): Promise<void> {
    const diff = `diff --git a/package-lock.json b/package-lock.json
index d644cc8e..458731ba 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -9,6 +9,7 @@
       "version": "1.19.2-chore-more-icons.2",
       "license": "Apache-2.0",
       "dependencies": {
+        "@ant-design/icons": "^5.3.7",
         "lodash.clonedeep": "4.5.0"
       },
       "devDependencies": {
@@ -98,7 +99,6 @@
       "version": "7.0.2",
       "resolved": "https://registry.npmjs.org/@ant-design/colors/-/colors-7.0.2.tgz",
       "integrity": "sha512-7KJkhTiPiLHSu+LmMJnehfJ6242OCxSlR3xHVBecYxnMW8MS/878NXct1GqYARyL59fyeFdKRxXTfvR9SnDgJg==",
-      "peer": true,
       "dependencies": {
         "@ctrl/tinycolor": "^3.6.1"
       }
@@ -123,10 +123,9 @@
       }
     },
     "node_modules/@ant-design/icons": {
-      "version": "5.3.1",
-      "resolved": "https://registry.npmjs.org/@ant-design/icons/-/icons-5.3.1.tgz",
-      "integrity": "sha512-85zROTJCCApQn0Ee6L9561+Vd7yVKtSWNm2TpmOsYMrumchbzaRK83x1WWHv2VG+Y1ZAaKkDwcnnSPS/eSwNHA==",
-      "peer": true,
+      "version": "5.3.7",
+      "resolved": "https://registry.npmjs.org/@ant-design/icons/-/icons-5.3.7.tgz",
+      "integrity": "sha512-bCPXTAg66f5bdccM4TT21SQBDO1Ek2gho9h3nO9DAKXJP4sq+5VBjrQMSxMVXSB3HyEz+cUbHQ5+6ogxCOpaew==",
       "dependencies": {
         "@ant-design/colors": "^7.0.0",
         "@ant-design/icons-svg": "^4.4.0",
@@ -145,8 +144,7 @@
     "node_modules/@ant-design/icons-svg": {
       "version": "4.4.2",
       "resolved": "https://registry.npmjs.org/@ant-design/icons-svg/-/icons-svg-4.4.2.tgz",
-      "integrity": "sha512-vHbT+zJEVzllwP+CM+ul7reTEfBR0vgxFe7+lREAsAA7YGsYpboiq2sQNeQeRvh09GfQgs/GyFEvZpJ9cLXpXA==",
-      "peer": true
+      "integrity": "sha512-vHbT+zJEVzllwP+CM+ul7reTEfBR0vgxFe7+lREAsAA7YGsYpboiq2sQNeQeRvh09GfQgs/GyFEvZpJ9cLXpXA=="
     },
     "node_modules/@ant-design/react-slick": {
       "version": "1.0.2",
@@ -3149,7 +3147,6 @@
       "version": "3.6.1",
       "resolved": "https://registry.npmjs.org/@ctrl/tinycolor/-/tinycolor-3.6.1.tgz",
       "integrity": "sha512-SITSV6aIXsuVNV3f3O0f2n/cgyEDWoSqtZMYiAmcsYHydcKrOz3gUxB/iXd/Qf08+IZX4KpgNbvUdMBmWz+kcA==",
-      "peer": true,
       "engines": {
         "node": ">=10"
       }
@@ -10747,8 +10744,7 @@
     "node_modules/classnames": {
       "version": "2.5.1",
       "resolved": "https://registry.npmjs.org/classnames/-/classnames-2.5.1.tgz",
-      "integrity": "sha512-saHYOzhIQs6wy2sVxTM6bUDsQO4F50V9RQ22qBpEdCW+I+/Wmke2HOl6lS6dTpdxVhb88/I6+Hs+438c3lfUow==",
-      "peer": true
+      "integrity": "sha512-saHYOzhIQs6wy2sVxTM6bUDsQO4F50V9RQ22qBpEdCW+I+/Wmke2HOl6lS6dTpdxVhb88/I6+Hs+438c3lfUow=="
     },
     "node_modules/clean-stack": {
       "version": "2.2.0",
@@ -24410,7 +24406,6 @@
       "version": "5.38.2",
       "resolved": "https://registry.npmjs.org/rc-util/-/rc-util-5.38.2.tgz",
       "integrity": "sha512-yRGRPKyi84H7NkRSP6FzEIYBdUt4ufdsmXUZ7qM2H5qoByPax70NnGPkfo36N+UKUnUBj2f2Q2eUbwYMuAsIOQ==",
-      "peer": true,
       "dependencies": {
         "@babel/runtime": "^7.18.3",
         "react-is": "^18.2.0"
@@ -24423,8 +24418,7 @@
     "node_modules/rc-util/node_modules/react-is": {
       "version": "18.2.0",
       "resolved": "https://registry.npmjs.org/react-is/-/react-is-18.2.0.tgz",
-      "integrity": "sha512-xWGDIW6x921xtzPkhiULtthJHoJvBbF3q26fzloPCK0hsvxtPVelvftw3zjbHWSkR2km9Z+4uxbDDK/6Zw9B8w==",
-      "peer": true
+      "integrity": "sha512-xWGDIW6x921xtzPkhiULtthJHoJvBbF3q26fzloPCK0hsvxtPVelvftw3zjbHWSkR2km9Z+4uxbDDK/6Zw9B8w=="
     },
     "node_modules/rc-virtual-list": {
       "version": "3.11.4",
diff --git a/package.json b/package.json
index 5e60a772..1d0a6511 100644
--- a/package.json
+++ b/package.json
@@ -110,6 +110,7 @@
     }
   },
   "dependencies": {
+    "@ant-design/icons": "^5.3.7",
     "lodash.clonedeep": "4.5.0"
   }
 }
diff --git a/src/components/general/Icon/NativeIcon.stories.tsx b/src/components/general/Icon/NativeIcon.stories.tsx
new file mode 100644
index 00000000..30876867
--- /dev/null
+++ b/src/components/general/Icon/NativeIcon.stories.tsx
@@ -0,0 +1,55 @@
+import { type Meta } from '@storybook/react'
+import { ButtonProps, Divider, Typography } from 'antd'
+import AntIcon from '@ant-design/icons'
+import { Icon, Button, ConfigProvider } from 'src/components'
+import { Icons } from 'src/constants/Icons'
+
+type DemoProps = {
+  buttonSize: ButtonProps['size']
+  buttonType: ButtonProps['type']
+  iconName: keyof typeof Icons
+}
+
+export const Demo = ({ buttonSize, buttonType, iconName = 'C360' }: DemoProps) => {
+  return (
+    <>
+      <Typography.Title>Aquarium Icon Wrapped in Ant Component</Typography.Title>
+      <Button size={buttonSize} type={buttonType} icon={<AntIcon component={Icons[iconName]} />}>
+        Click me
+      </Button>
+      <Divider />
+      <Typography.Title>Aquarium Icon Component</Typography.Title>
+      <Button size={buttonSize} type={buttonType} icon={<Icon name={iconName} />}>
+        Click me
+      </Button>
+    </>
+  )
+}
+
+const meta: Meta = {
+  title: 'Aquarium/General/AntIcons',
+  component: Demo,
+  decorators: [
+    Story => (
+      <ConfigProvider>
+        <Story />
+      </ConfigProvider>
+    ),
+  ],
+  argTypes: {
+    buttonSize: {
+      control: 'select',
+      options: ['small', 'medium', 'large'],
+    },
+    buttonType: {
+      control: 'select',
+      options: ['default', 'primary', 'dashed', 'link', 'text'],
+    },
+    icon: {
+      controls: 'select',
+      options: Object.keys(Icon),
+    },
+  },
+}
+
+export default meta`

    setReviewDiff(diff)
  }


}