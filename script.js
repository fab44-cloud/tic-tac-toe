// Gameboard object
const Gameboard = (() => {
    // gameboard array
    let boardArray = ["", "", "", "", "", "", "", "", ""];

    // Methods
    const markSquare = (index, playerSymbol) => {
        if (index < 0 || index > 8 || boardArray[index] !== "") {
            console.log("Invalid move! Square is already take or out of bounds.");
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

    // Publicly accessible methods of the Gameboard object.
    return { markSquare, reset, getBoard, printBoard }; 
})();


// Player objects
const playerFactory = (name, symbol) => {
    return { name, symbol };
};

// const player1 = playerFactory("Player 1", "X");
// const player2 = playerFactory("Player2", "O");

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
        Gameboard.reset();
        currentPlayer = players[0];
        gameActive = true;
        movesMade = 0;
        console.log("Game has started! It is player 1's turn.")
        Gameboard.printBoard();
    };

    const handlePlayerMove = (index) => {
        if (!gameActive) {
            console.log("Game over! Call startGame() to play again.")
            return;
        }
        // Try to mark the square on the current gameBoard
        if (Gameboard.markSquare(index, currentPlayer.symbol)){
            movesMade ++;
            Gameboard.printBoard();

            // Check for win or draw
        }
    }
    

})();




