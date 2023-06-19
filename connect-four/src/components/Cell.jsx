export const Cell = ({children, playerTurn, updateBoard, indexRow, indexCol, columnHoverBoard, hovered }) => {

  const handleColumnHover = () => {
    columnHoverBoard(indexCol)
  };

  const className = `cell col-${indexCol} ${hovered === (indexRow+"-"+indexCol) ? 'hovered_' + playerTurn : ''}`

  const handleClick = () => {
    updateBoard(indexRow, indexCol)
  }

  return (
    <td onClick={handleClick} onMouseEnter={handleColumnHover} className={className}>
      <svg class="cell__svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" className={children!=null ? children : 'empty-slot' } />
      </svg>
    </td>
  )
}