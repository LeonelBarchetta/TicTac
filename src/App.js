import './App.css';
import { Square } from './Components/Square/Square';
import { useState } from 'react';

export default function Board() {
  const [xIsNext,setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [empate, setEmpate] = useState(0);
  function handleClick (i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquare = squares.slice()
    if (xIsNext){
      nextSquare[i] = "x"
    }else{
      nextSquare[i] = "o"
    }

    setEmpate(empate + 1);
    setSquares(nextSquare)
    setXIsNext(!xIsNext)
  }

  function calculateWinner (squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0 ; i < lines.length; i++){
      const [a,b,c] = lines[i]
      if (squares[a]  && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null
    
  }

  const winner = calculateWinner(squares)
  // let empate = 0
  // for (let j = 0 ; j < squares.length; j++){
  //   empate = empate + j
  // }
   let status
  if (winner){
    status = "Winner: " + winner
  }else{
    status = "Next player: " + (xIsNext ? "x" : "o")
  }
  if (empate == 9 &&  calculateWinner(squares) == null){
    status = "EMPATE "
  }
  function reloadPage() {
    window.location.reload();
}
  return (
    <>
      <div className='div'>
        <h1>TIC TAC TOE</h1>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        <div className="status">{status}{status=="EMPATE " || status=="Winner: " + winner ? <button className='again' onClick={reloadPage}> again?</button> : ""}</div>
      </div>
     
    </>
  
  )
}


