// Gameboard object
const Gameboard = (() => {
    // gameboard array
    let boardArray = ["", "", "", "", "", "", "", "", ""];

    // Methods
    const markSquare = (index, playerSymbol) => {
        // console.log(markSquare);
        if (boardArray[index] === "") {
            boardArray[index] === playerSymbol;
        }
        return false; // Indicates square was already marked
    };

    const reset = () => {
        boardArray = ["", "", "", "", "", "", "", "", ""];
    }

    const getBoard = () => boardArray; // Allows access to the board without directly modifying it

    return { markSquare, reset, getBoard }; // Publicly accessible methods of the Gameboard object.
})();


// Player objects
const playerFactory = (name, symbol) => {
    return { name, symbol };
};

const player1 = playerFactory("Player 1", 'X');
const player2 = playerFactory("Player2", 'O');

// Game flow control 
const GameController = (() => {
    // Properties
    const players = [playerFactory("Player1", "X"), playerFactory("Player 2", "O")]
    let currentPlayer = player1;
    let gameActive = false;
    let movesMade = 0;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
})();