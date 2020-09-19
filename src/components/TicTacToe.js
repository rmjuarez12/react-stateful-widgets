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
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  // When a square is clicked, Add either x or o
  function selectSquare(id) {
    // Get the square element
    const getSquare = document.getElementById(`Sqr${id}`);

    // Get the current player
    const currentPlayer = xIsNext ? "x" : "o";

    if (!getSquare.classList.contains("active") && currentPlayer !== "o") {
      // Add the active class to the element
      getSquare.classList.add("active", `active-${currentPlayer}`);

      // Add the square to the array
      const newSquares = squares.slice();
      newSquares[id] = currentPlayer;

      // Add the element into the box
      getSquare.textContent = currentPlayer;

      // Set the new state to the square array
      setSquares(newSquares);

      // Switch Player
      setXIsNext(!xIsNext);

      // Check for a winner on each click
      const winner = decideWinner(newSquares);

      // Make the CPU do a move next
      if (winner === null) {
        cpuTurn(newSquares);
      }
    }
  }

  // This is where the CPU will play if the player already did his move
  function cpuTurn(curSquares) {
    if (gameWinner === null) {
      setTimeout(() => {
        // Index to use where to place the CPU move
        let movePosition;

        // Get a position to make a move
        const randomPosition = Math.floor(Math.random() * curSquares.length);

        // Check if the square is taken. If so, retry
        if (curSquares[randomPosition] !== null) {
          // Call the function again
          cpuTurn(curSquares);

          // Check if it did retried
          console.log("Retry");

          // Ensure no more code is executed past this point
          return;
        } else {
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

          // Check if the CPU or the player has a winning move
          winningLines.forEach((line) => {
            const [a, b, c] = line;

            if (curSquares[a] && curSquares[a] === curSquares[b] && curSquares[c] === null) {
              movePosition = c;
            } else if (curSquares[a] && curSquares[b] === null && curSquares[c] === curSquares[a]) {
              movePosition = b;
            } else if (curSquares[a] === null && curSquares[b] && curSquares[c] === curSquares[b]) {
              movePosition = a;
            }
          });

          // If no winning moves, add to a random square
          if (movePosition === undefined) {
            movePosition = randomPosition;
          }

          // Check if the move was successful
          console.log("Success");
        }

        // Get the square element
        const getSquare = document.getElementById(`Sqr${movePosition}`);

        // Add the active class to the element
        getSquare.classList.add("active", `active-o`);
        getSquare.textContent = "o";

        // Set the new state to the square array
        curSquares[movePosition] = "o";
        setSquares(curSquares);

        // Switch back to Player
        setXIsNext(true);

        // Check for a winner on each click
        decideWinner(curSquares);
      }, 500);
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

    let winner = null;

    // Check if there is any square that matches a combination above
    winningLines.forEach((line, index) => {
      const [a, b, c] = line;

      if (curSquares[a] && curSquares[a] === curSquares[b] && curSquares[a] === curSquares[c]) {
        // Set the winner player
        setGameWinner(curSquares[a]);

        if (curSquares[a] === "x") {
          setPlayerScore(playerScore + 1);
        } else {
          setCpuScore(cpuScore + 1);
        }

        // Variable to return
        winner = curSquares[a];

        // Disable squares
        disableSquares();
      }
    });

    if (!curSquares.includes(null) && winner === null) {
      // Set the winner player
      setGameWinner("tie");

      // Variable to return
      winner = "tie";

      // Disable the squares
      disableSquares();
    }

    return winner;
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

    // Reset the winner
    setGameWinner(null);

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
    status = `Current move: ${getPlayer}`;
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

      <div className="scores">
        <span>Player: {playerScore}</span>
        <span>CPU: {cpuScore}</span>
      </div>

      <div className="game-board">
        {squares.map((square, index) => {
          return <Squares key={index} id={index} selectSquare={selectSquare} />;
        })}
      </div>

      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}
