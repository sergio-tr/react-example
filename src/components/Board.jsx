import { useState } from 'react'
import Square from './Square'
import WinnerModal from './WinnerModal'

export default function Board({ dimension }) {

    const CONSTS = {
        INITIAL_BOARD : Array(dimension*dimension).fill(null),
        X: 'X',
        O: 'O',
    }

    const [board, setBoard] = useState(CONSTS.INITIAL_BOARD)
    const [turn, setTurn] = useState(CONSTS.X)
    const [isThereWinner, setIsThereWinner] = useState(false)
    const [winner, setWinner] = useState(null)

    const getRowElements = (board, row) => {
        const startIndex = row * dimension
        return board.slice(startIndex, startIndex + dimension)
    }

    const checkWinner = (board) => {

        const allEqual = (arr) => arr.every(v => v !== null && v === arr[0])

        for (let row = 0; row < dimension; row++) {
            const rowElements = getRowElements(board, row)
            if (allEqual(rowElements)) return rowElements[0]
        }
        for (let col = 0; col < dimension; col++) {
            const colElements = []
            for (let row = 0; row < dimension; row++) {
                const rowElements = getRowElements(board, row)
                colElements.push(rowElements[col])
            }
            if (allEqual(colElements)) return colElements[0]
        }

        const mainDiagonal = []
        for (let i = 0; i < dimension; i++) {
            mainDiagonal.push(board[i * dimension + i])
        }
        if (allEqual(mainDiagonal)) return mainDiagonal[0]

        const secondaryDiagonal = []
        for (let i = 0; i < dimension; i++) {
            secondaryDiagonal.push(board[i * dimension + (dimension - i - 1)])
        }
        if (allEqual(secondaryDiagonal)) return secondaryDiagonal[0]

        return null;

    }

    const isGameOver = (board) => board.every((square) => square !== null)

    const handleClick = (index) => {
        
        // PRE-CHECKS
        if (board[index] !== null || isThereWinner) return

        // GAME LOGIC
        const newBoard = structuredClone(board)
        newBoard[index] = turn

        const newTurn = turn === CONSTS.X ? CONSTS.O : CONSTS.X
        setTurn(newTurn)

        setBoard(newBoard)

        // POST-CHECKS
        const winner = checkWinner(newBoard)
        if (winner) {
            setWinner(winner)
            setIsThereWinner(true)
        } else if (isGameOver(newBoard)) {
            setIsThereWinner(true)
        }
    }

    const resetGame = () => {
        setBoard(CONSTS.INITIAL_BOARD)
        setTurn(CONSTS.X)
        setWinner(null)
        setIsThereWinner(false)
    }

    const gameStyle = { 
        display: 'grid', 
        gridTemplateColumns: `repeat(${dimension}, 1fr)`, 
        gap: '10px' 
    }

    return (
        <>
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