export default function Initializer({ setIsInitialized }) {

    const handleClick = () => {
        setIsInitialized(true)

        const dimension = Number(document.getElementById('dimension').value)
        window.localStorage.setItem('dimension', dimension)
    }

    return (
        <div className="input">
            <label htmlFor="dimension">Select the dimension of the tic tac toe board (3-10)</label>
            <input
                type="number"
                id="dimension"
                name="dimension"
                min="3"
                max="10"
                defaultValue={3}
                onKeyDown={e => e.preventDefault()}
            />

            <button onClick={handleClick}>Start game</button>
        </div>
    )
}