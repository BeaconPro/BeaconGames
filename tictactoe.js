const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
let currentPlayer = "X";
let board = Array(9).fill(null);

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function updateStatus(winner) {
    if (winner) {
        statusText.textContent = `Player ${winner} wins!`;
        cells.forEach(cell => cell.removeEventListener("click", onClick));
    } else if (board.every(cell => cell)) {
        statusText.textContent = "It's a tie!";
    } else {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function onClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    const winner = checkWinner();
    updateStatus(winner);

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
        cell.addEventListener("click", onClick);
    });
    currentPlayer = "X";
    updateStatus(null);
}

cells.forEach(cell => cell.addEventListener("click", onClick));
restartButton.addEventListener("click", resetGame);
updateStatus(null);
