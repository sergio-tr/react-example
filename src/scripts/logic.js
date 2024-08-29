let dimension = 0

const getRowElements = (board, row) => {
    const startIndex = row * dimension
    return board.slice(startIndex, startIndex + dimension)
}

export const checkWinner = (board, newDimension) => {

    dimension = newDimension

    const allEqual = (board) => board.every(v => v !== null && v === board[0])

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

export const isGameOver = (board) => board.every((square) => square !== null)