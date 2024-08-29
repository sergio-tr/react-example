import { useState } from 'react'

import Square from './Square'
import WinnerModal from './WinnerModal'

import { getConsts } from '../scripts/constants'
import { saveGame, restartGame, getItem } from '../scripts/localStorage'
import { checkWinner, isGameOver} from '../scripts/logic'

import confetti from 'canvas-confetti'

export default function Board() {

    const dimension = getItem('dimension')

    const CONSTS = getConsts(dimension)

    const [board, setBoard] = useState(() => {
        const storedBoard = getItem('board')
        return storedBoard ? JSON.parse(storedBoard) : CONSTS.INITIAL_BOARD
    })
    const [turn, setTurn] = useState(() => {
        const storedTurn = getItem('turn')
        return storedTurn ? storedTurn : CONSTS.X
    })
    const [isThereWinner, setIsThereWinner] = useState(false)
    const [winner, setWinner] = useState(null)

    
    const handleClick = (index) => {
        
        // PRE-CHECKS
        if (board[index] !== null || isThereWinner) return

        // GAME LOGIC
        const newBoard = structuredClone(board)
        newBoard[index] = turn

        const newTurn = turn === CONSTS.X ? CONSTS.O : CONSTS.X
        setTurn(newTurn)

        setBoard(newBoard)

        // STATE SAVING
        saveGame(newBoard, newTurn)

        // POST-CHECKS
        const winner = checkWinner(newBoard, dimension)
        if (winner) {
            setWinner(winner)
            setIsThereWinner(true)
            confetti()
        } else if (isGameOver(newBoard)) {
            setIsThereWinner(true)
        }
    }

    const resetGame = () => {
        restartGame()
        setBoard(CONSTS.INITIAL_BOARD)
        setTurn(CONSTS.X)
        setWinner(null)
        setIsThereWinner(false)
    }

    const newDimension = () => {
        restartGame(true)
        location.reload()
    }

    console.log(dimension)
    const gameStyle = { 
        display: 'grid', 
        gridTemplateColumns: `repeat(${dimension}, 1fr)`, 
        gap: '10px' 
    }

    return (
        <>
            <div>
                <button onClick={newDimension}>Select new dimension</button>
                <button onClick={resetGame}>Restart game</button>
            </div>
            <section className='game' style={gameStyle} >
                {
                    board.map((_, index) => 
                        <Square key={index}
                                handleClick={() => { handleClick(index) }}  >
                            {board[index]}
                        </Square>
                    )
                }
            </section>

            <section className='turn'>

                <div className='info'>
                    <h2>Next turn:</h2>
                </div>
                <Square isSelected={turn === CONSTS.X}>
                    {CONSTS.X}
                </Square>
                <Square isSelected={turn === CONSTS.O}>
                    {CONSTS.O}
                </Square>
            </section>

            {isThereWinner && <WinnerModal winner={winner} resetGame={resetGame} />}
        </>
    )
}   