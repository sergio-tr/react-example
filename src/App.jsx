import { useState } from 'react'
import Board from './components/Board'
import Initializer from './components/Initializer'
import { getItem, setItem } from './scripts/localStorage'
import './App.css'

export default function App() {
    const [isInitialized, setIsInitialized] = useState(false)

    const isAlreadyInitialized = getItem('isInitialized')

    return (
      <main className="board">
        <h1>Welcome to Tic Tac Toe</h1>

        {isInitialized && setItem('isInitialized', 'true')}

        { isAlreadyInitialized === 'true' || isInitialized 
          ? <Board />
          : <Initializer setIsInitialized={setIsInitialized}/> }
      </main>
    )
}
