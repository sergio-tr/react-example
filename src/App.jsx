import { useState } from 'react'
import Board from './components/Board'
import Initializer from './components/Initializer'
import './App.css'

export default function App() {
    const [isInitialized, setIsInitialized] = useState(false)
    const [dimension, setDimension] = useState(3)

    return (
      <main className="board">
        <h1>Welcome to Tic Tac Toe</h1>
        { isInitialized 
          ? <Board dimension={dimension} />
          : <Initializer setIsInitialized={setIsInitialized} setDimension={setDimension}/> }
      </main>
    )
}
