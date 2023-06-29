import './App.css';
import { useState } from 'react';

function Square({value, handleSquareClick, heightlight}){
  if (heightlight){
    return (<button className='square' onClick={handleSquareClick} style={{color:'red'}}>{value}</button>)
  }else{
    return (<button className='square' onClick={handleSquareClick}>{value}</button>)
  }
  
}


function Broad({xIsNext, squares, onPlay, isDraw}) {

  let content;

  function handleClick(i){
    if(squares[i] || calculateWinner(squares).square){
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
    onPlay(newSquares, i);
  }


  const winner = calculateWinner(squares);
  if (winner.square){
    content = 'Winner: ' + winner.square; 
  }else{
    if (isDraw){
      content = 'Draw'
    }else{
      content = 'Next Player: ' + (xIsNext ? 'X' : 'O');
    }
    
  }

  function renderSquare(i){
    return (
      <Square value={squares[i]} handleSquareClick={() => handleClick(i)} heightlight={winner.line.includes(i)}/>
    )
  }

  const drawSquare = [0, 1, 2].map((row) => {
    return (
      <div className='row' key={row}>
        {[0, 1, 2].map((col) => {
          return renderSquare(row * 3 + col);
        })}
      </div>
    )
  })
  return (
    <div className="App">
      <div className='content'>{content}</div>
      {
        drawSquare
      }
      
    </div>
  );
}

// 判断获胜的逻辑
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
      return {square: square[a], line: list[i]};
    }
  }
  return {square: null, line: []};
}

function Game(){
  const [squareList, setSquareList] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [position, setPosition] = useState([-1])
  const xIsNext = currentMove % 2 === 0;
  const isDraw = currentMove > 8 ? true : false;

  const squares = squareList[currentMove];

  function handlePlay(newSquares, currentClick){
    const nextHistory = [...squareList.slice(0, currentMove + 1), newSquares];
    const nextPoition = [...position.slice(0, currentMove + 1), currentClick];
    setSquareList(nextHistory);
    setPosition(nextPoition);
    // console.log(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function moveTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = squareList.map((item, move) => {
    // 这边的item 代表遍历的值，move代表当前索引
    let desription;
    const row = parseInt(position[move] / 3) + 1
    const col = position[move] % 3 + 1
    if (move > 0){
      // desription = "Go to move #" + move;
      desription = "" + `Go to move # (${row}, ${col})`;
    }else{
      desription = "Go to game start";
    }

    return (
      <div key={move} className='history-buttom'>
        <button className='move_des' onClick={() => moveTo(move)}>{desription}</button>
      </div>
    )
  })


  const steps = squareList.map((step, stepIndex) => {
    let desription;
    if (stepIndex > 0){
      desription = "You are at move #" + stepIndex;
      return <li key={stepIndex}>
      <button className='move_des' onClick={() => moveTo(stepIndex)}>{desription}</button>
    </li>
    }
  })

  return (
    <div className='game'>
    

    <div className='history-info2'>
      <div className='content'>{"You are at move #" + (squareList.length - 1)}</div>
    </div>

    <div className='broad'>
      <Broad xIsNext={xIsNext} squares={squares} onPlay={handlePlay} isDraw={isDraw}/>
    </div>

    <div className='history-info1'>
      {moves}
    </div>

    </div>
  )

}
export default Game;
