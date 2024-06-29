import {AppContent} from 'src/components/AppContent.tsx'
import {AppNavigation} from 'src/components/AppNavigation.tsx'
import 'src/styles/app.css'

function App() {
  return (<>
    <AppNavigation/>
    <AppContent/>
  </>)
}

export const AppName = 'Review Forge' as const

export default App