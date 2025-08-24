// GameBoard object
const GameBoard = (() => {
    // gameboard array
    let boardArray = ["", "", "", "", "", "", "", "", ""];

    // Methods
    const markSquare = (index, playerSymbol) => {
        if (index < 0 || index > 8 || boardArray[index] !== "") {
            console.log("Invalid move! Square is already taken or out of bounds.");
            return false; // Indicates square was already marked
        }
        boardArray[index] = playerSymbol;
        return true; // Indicate move succeeded
    };

    const reset = () => {
        boardArray = ["", "", "", "", "", "", "", "", ""];
    }

    // This will be the method of getting the entire board that our
    // UI will need to render it.
    const getBoard = () => [...boardArray]; // Returns a copy to prevent direct modification

    // Add a way to visually inspect the board in the console
    const printBoard = () => {
        console.log(`
            ${boardArray[0] || " "} | ${boardArray[1] || " "} | ${boardArray[2] || " "}
            ---------
            ${boardArray[3] || " "} | ${boardArray[4] || " "} | ${boardArray[5] || " "}
            ---------
            ${boardArray[6] || " "} | ${boardArray[7] || " "} | ${boardArray[8] || " "}
            ---------
        `);
    };

    // Publicly accessible methods of the GameBoard object.
    return { markSquare, reset, getBoard, printBoard }; 
})();


// Player objects
const playerFactory = (name, symbol) => {
    return { name, symbol };
};

// const player1 = playerFactory("Player 1", "X");
// const player2 = playerFactory("Player2", "O");

// displayController object
// generate game board cells
const displayController = (() => {
    const gameBoardElement = document.getElementById("gameBoard");
    const messageElement = document.getElementById("message");

    const cells = [];

    const init = function() {
        for (i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            // Attach a custom data attribute called "data-index" to each cell.
            // The value of this attribute is the current loop index.
            // This allows you to identify which cell was clicked using JavaScript.
            cell.dataset.index = i;
            gameBoardElement.appendChild(cell);
            // Add a reference to the newly created cell element to the "cells" array.
            // This array stores all the cell elements, making it easy to access them later.
            // For example, to update their content when the game board changes.
            cells.push(cell);
            // Add an event listener to each cell for player moves
            cell.addEventListener("click", () => GameController.handlePlayerMove(i));
        }
    };

    const renderGameBoard = function(gameBoardArray) {
        for (let i = 0; i < gameBoardArray.length; i++) {
            console.log(cells[i]);
            cells[i].textContent = gameBoardArray[i];
        }
    };

    const displayMessage = function(message) {
        messageElement.textContent = message;
    };

    return { init, renderGameBoard, displayMessage };
})();

// Game flow control 
const GameController = (() => {
    // Properties
    const players = [playerFactory("Player1", "X"), playerFactory("Player 2", "O")]
    let currentPlayer = players[0];
    let gameActive = false;
    let movesMade = 0;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const startGame = () => {
        GameBoard.reset();
        currentPlayer = players[0];
        gameActive = true;
        movesMade = 0;
        // console.log("Game has started! It is player 1's turn.")
        displayController.displayMessage("Game has started! It is player 1's turn.");
        // GameBoard.printBoard();
        displayController.renderGameBoard(GameBoard.getBoard());
    };

    const handlePlayerMove = (index) => {
        if (!gameActive) {
            console.log("Game over! Call startGame() to play again.")
            return;
        }
        // Try to mark the square on the current gameBoard
        if (GameBoard.markSquare(index, currentPlayer.symbol)){
            movesMade ++;
            GameBoard.printBoard();

            // Check for win or draw
            if (checkWin()) {
                console.log(`${currentPlayer.name} wins!`);
                gameActive = false;
            } else if (checkDraw()) {
                console.log("It's a draw!")
                gameActive = false;
            } else {
                // If no win or draw, switch player
                switchPlayer();
                console.log(`${currentPlayer.name}'s turn`);
            }
        } else {
            // Invalid move already logged by GameBoard.markSquare
        }
    };
    
    const checkWin = () => {
        const board = GameBoard.getBoard() // Get the current board state
        return winningConditions.some(condition => { // Loop through winning conditions
            const [a, b, c] = condition; // Destructure the indices for the current condition
            return (
                board[a] === currentPlayer.symbol &&
                board[b] === currentPlayer.symbol &&
                board[c] === currentPlayer.symbol
            );
        });
    }; 

    const checkDraw = () => {
        // A draw occurs if all squares are filled (9 moves made) and there's no winner
        return movesMade === 9 && !checkWin();
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0]
    };

    return { startGame, handlePlayerMove }  

})();

// Listens for the browser to finish parsing the html document
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the display, creating the cell elements and attaching their 
    // listeners
    displayController.init();
    
    // Get the button by its new ID
    const startButton = document.getElementById("start-btn");
    
    if (startButton) {
        startButton.addEventListener("click", () => {
            GameController.startGame();
        });
    } else {
        console.error("Start button not found!");
    } 
});


//   const gameFunctions = GameController
//   const startGame = gameFunctions[0]
//   const handlePlayerMove = gameFunctions[1]

// const [startGame, handlePlayerMove] = GameController;



