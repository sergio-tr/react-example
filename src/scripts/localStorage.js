export const saveGame = (board, turn) => {
    setItem('board', JSON.stringify(board))
    setItem('turn', turn)
}

export const restartGame = (newDimension = false) => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    if(newDimension) {
        window.localStorage.removeItem('isInitialized')
        window.localStorage.removeItem('dimension')
    }
}

export const getItem = (key) => window.localStorage.getItem(key)
export const setItem = (key, value) => window.localStorage.setItem(key, value)