export default function Square({ children, isSelected=false, handleClick }) {

    const className = `square ${isSelected ? 'is-selected' : ''}`

    return (
        <div className={className} onClick={handleClick}>
            {children}
        </div>
    )
}