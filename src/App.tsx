import {useState} from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Review Forge</h1>
      <div className="card">
        <button className="card__button" onClick={() => setCount((count) => count + 1)}>
          Level is {count}
        </button>
      </div>
    </>
  )
}

export default App