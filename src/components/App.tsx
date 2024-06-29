import {AppContent} from './AppContent.tsx'
import {AppNavigation} from './AppNavigation.tsx'
import './../App.css'

function App() {
  return (<>
    <AppNavigation/>
    <AppContent/>
  </>)
}

export const AppName = 'Review Forge' as const

export default App