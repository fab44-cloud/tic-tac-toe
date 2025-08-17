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

    return { markSquare, reset, getBoard };
})();


// Player objects
const playerFactory = (name, symbol) => {
    return { name, symbol };
};

const player1 = playerFactory("Player 1", 'X');
const player2 = playerFactory("Player2", 'O');