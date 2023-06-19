export function WinnerModal ({onClose, winner}) {
    if (winner === null) return null;

    const classNameWinner = `${winner ? winner : 'draw'}`
    const winnerCondition =  `${winner ? 'Ganador' : 'Empate'}`
  
    return (
      <section className="winner" onClick={onClose}>
        <div className="text">
          <h2>{winnerCondition}</h2>
          <div className="winner__logo">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" className={classNameWinner} />
            </svg>
          </div>
          <button className="btn-winner" onClick={onClose}>Volver A Empezar</button>
        </div>
      </section>
    )
}