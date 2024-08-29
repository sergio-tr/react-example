export const getConsts = (dimension) => {
    return {    
        INITIAL_BOARD : Array(dimension*dimension).fill(null),
        X: '❌',
        O: '⭕',
    }
}