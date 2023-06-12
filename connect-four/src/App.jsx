const board = Array(42).fill(null)

function App() {

  return (
    <main className='board'>
      <h1>Connect 4</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <div className='cell' key={index}>
                <span className='cell__content'>
                  {index}
                </span>
              </div>
            )
          })
        }
      </section>
    </main>
  )
}

export default App
