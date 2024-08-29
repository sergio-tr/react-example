import Square from './Square.jsx'

export default function WinnerModal ({ winner, resetGame }) {

  const winnerHeader = winner===null ? 'Tie' : 'Won by'
  const winnerText = winner===null ? '-' : winner

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerHeader}</h2>

        <header className='win'>
          <Square>{winnerText}</Square>
        </header>

        <footer>
          <button onClick={resetGame}>Start again</button>
        </footer>
      </div>
    </section>
  )
}