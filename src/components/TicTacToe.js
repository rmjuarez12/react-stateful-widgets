// Import React
import React, { useState } from "react";

// Component for the board squares
function Squares(props) {
  const squareId = `Sqr${props.id}`;

  return (
    <div>
      <button
        id={squareId}
        className="square"
        onClick={() => {
          props.selectSquare(props.id);
        }}
      ></button>
    </div>
  );
}

// Full Tic Tac Toe Component
export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameWinner, setGameWinner] = useState(null);

  // When a square is clicked, Add either x or o
  function selectSquare(id) {
    // Get the square element
    const getSquare = document.getElementById(`Sqr${id}`);

    if (!getSquare.classList.contains("active")) {
      // Get the current player
      const currentPlayer = xIsNext ? "x" : "o";

      // Add the active class to the element
      getSquare.classList.add("active", `active-${currentPlayer}`);

      // Add the square to the array
      const newSquares = squares.slice();
      newSquares[id] = currentPlayer;
      console.log(newSquares);

      // Add the element into the box
      getSquare.textContent = currentPlayer;

      // Set the new state to the square array
      setSquares(newSquares);

      // Switch Player
      setXIsNext(!xIsNext);

      // Check for a winner on each click
      decideWinner(newSquares);
    }
  }

  // Check if there is a winner
  function decideWinner(curSquares) {
    // Outline all possible winning combinations
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check if there is any square that matches a combination above
    winningLines.forEach((line, index) => {
      const [a, b, c] = line;

      if (curSquares[a] && curSquares[a] === curSquares[b] && curSquares[a] === curSquares[c]) {
        // Set the winner player
        setGameWinner(curSquares[a]);

        // Disable squares
        disableSquares();
      }
    });

    // Set the winner as a tie in case no one wins
    if (!curSquares.includes(null)) {
      // Set the winner player
      setGameWinner("tie");

      // Disable the squares
      disableSquares();
    }
  }

  // Disable all squares once a winner is decided
  function disableSquares() {
    const getAllSquares = document.querySelectorAll(".square");

    getAllSquares.forEach((square) => {
      square.setAttribute("disabled", true);
      return;
    });
  }

  // Reset the game
  function resetGame() {
    // Reset squares to default
    setSquares(Array(9).fill(null));

    // Reset to first player
    setXIsNext(true);

    // Reset all squares
    const getSquareElements = document.querySelectorAll(".square");
    getSquareElements.forEach((square) => {
      square.classList.remove("active", "active-x", "active-o");
      square.textContent = "";
      square.removeAttribute("disabled");
    });
  }

  // This is for the message above the board
  let status;

  // If there is a winner, show winner, otherwise, choose current player
  if (gameWinner === null) {
    const getPlayer = xIsNext ? "Player" : "CPU";
    status = `Current Player is: ${getPlayer}`;
  } else {
    let getWinner;
    if (gameWinner === "x") {
      getWinner = "Player";
    } else {
      getWinner = "CPU";
    }

    if (gameWinner !== "tie") {
      status = `Winner is: ${getWinner}`;
    } else {
      status = `It's a tie!`;
    }
  }

  return (
    <div className="tictactoe container">
      <h2>Tic Tac Toe</h2>

      <h3>{status}</h3>

      <div className="game-board">
        {squares.map((square, index) => {
          return <Squares key={index} id={index} selectSquare={selectSquare} />;
        })}
      </div>

      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}
