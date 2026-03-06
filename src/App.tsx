import { useState } from "react";

type Player = "X" | "O" | null;

function App() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isX, setX] = useState(true);


  

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  function getWinner(squares: Player[]) {
    for (const [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(index: number) {
    if (board[index] || getWinner(board)) return;

    setBoard((prev) => {
      const copy = [...prev];
      copy[index] = isX ? "X" : "O";
      return copy;
    });

    setX((prev) => !prev);
  }

  function getGameStatus() {
    const winner = getWinner(board);
    if (winner) return `Winner: ${winner}`;
    if (board.every(Boolean)) return `It's a Draw`;
    return `Next Player: ${isX ? "X" : "O"}`;
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setX(true);
  }

  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center p-4">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-white mb-4">
          Tic-Tac-Toe
        </h1>

        {/* Game Status */}
        <div
          className={`text-center mb-6 font-semibold ${
            getWinner(board)
              ? "text-green-400 text-2xl animate-bounce"
              : "text-white text-xl"
          }`}
        >
          {getGameStatus()}
        </div>

<div className="flex justify-center items-center">

        {/* Board Grid */}
        <div className="grid grid-cols-3 gap-2">
          {board.map((square, index) => (
            <button
            key={index}
            onClick={() => handleClick(index)}
            className={`w-24 h-24 sm:w-28 sm:h-28 bg-gray-700 rounded-lg text-white text-4xl font-bold flex items-center justify-center 
              hover:bg-gray-600 transition-colors duration-200
              ${square ? "cursor-not-allowed opacity-90" : "cursor-pointer"}`}
              >
              {square}
            </button>
          ))}
        </div>
          </div>

        {/* New Game Button */}
        <button
          onClick={resetGame}
          className="mt-6 w-full py-3 bg-green-500 hover:bg-green-600 rounded-xl text-white font-semibold text-lg transition-colors duration-200"
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;
