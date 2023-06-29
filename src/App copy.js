import './App.css';
import { useState } from 'react';

function Square({value, handleSquareClick}){

  return (<button className='square' onClick={handleSquareClick}>{value}</button>)
}


function Broad({xIsNext, squares, onPlay}) {

  let content;

  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    let newSquares = squares.slice();
    if(xIsNext){
      newSquares[i] = 'X';
    }else{
      newSquares[i] = 'O';
    }
    // setSquares(newSquares);
    // setXIsNext(!xIsNext);
    onPlay(newSquares);
  }

  const winner = calculateWinner(squares);
  if (winner){
    content = 'Winner: ' + winner; 
  }else{
    content = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }



  return (
    <div className="App">
      <div className='content'>{content}</div>
      <div className='row'>
        <Square value={squares[0]} handleSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} handleSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} handleSquareClick={() => handleClick(2)} />
      </div>
      <div className='row'>
      <Square value={squares[3]} handleSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} handleSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} handleSquareClick={() => handleClick(5)} />
      </div>
      <div className='row'>
      <Square value={squares[6]} handleSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} handleSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} handleSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}


function calculateWinner(square){
  const list = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < list.length; i ++){
    const [a, b, c] = list[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]){
      return square[a];
    }
  }
  return null;
}

function Game(){
  const [squareList, setSquareList] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;

  const squares = squareList[currentMove];

  function handlePlay(newSquares){
    const nextHistory = [...squareList.slice(0, currentMove + 1), newSquares];
    setSquareList(nextHistory);
    console.log(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function moveTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = squareList.map((item, move) => {
    // 这边的item 代表遍历的值，move代表当前索引
    let desription;
    if (move > 0){
      desription = "Go to move #" + move;
    }else{
      desription = "Go to game start";
    }
    return (
      <li key={move}>
        <button className='move_des' onClick={() => moveTo(move)}>{desription}</button>
      </li>
    )
  })
  
  



  return (
    <div className='game'>
    <div className='broad'>
      <Broad xIsNext={xIsNext} squares={squares} onPlay={handlePlay}/>
    </div>
    <div className='history-info'>
      {moves}
    </div>
    </div>
  )

}
export default Game;
