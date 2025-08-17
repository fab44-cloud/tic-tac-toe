// Gameboard object
const Gameboard = (() => {
    // gameboard array
    let boardArray = ["", "", "", "", "", "", "", "", ""];
})();


// Player objects
const playerFactory = (name, symbol) => {
    return { name, symbol };
};

const player1 = playerFactory("Player 1", 'X');
const player2 = playerFactory("Player2", 'O');