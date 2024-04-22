// Game state keeps track of the boards values. Starts with everything being empty
let gameState = ["", "", "", "", "", "", "", "", ""];

let gameActive = true;

//Sets starting player as X
let currentPlayer = "X";

//Establishes our message varriables
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const drawMessage = () => `Game ended in a draw!`;
const winningMessage = () => `Player ${currentPlayer} has won!`;

//Creating variable for reset button
const resetButton = document.querySelector('.game--restart');

//Sets the variable atttached to the game status header
const statusDisplay = document.querySelector('.game--status');

//Adds the click listener to our game container which allows for our cells to inherit the listener
document.querySelector('.game--container').addEventListener('click', handleCellClick);

//Setting what happens when a cell is clicked
function handleCellClick(clickedCellEvent) {

  if (gameActive) {  
    //Saves the clicked cell as a variable
    const clickedCell = clickedCellEvent.target;

    //Gets the location of the cell via the data-index attribute
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    //Checks if there is a current value in the clicked cell. If the cell is not empty, it stops the function.
    if (gameState[clickedCellIndex] !== "") {
        return; // stop executing function
    }

    //Adding a function for what to do if the cell is empty
    handleCellPlayed(clickedCell, clickedCellIndex);

    //Adding a function to check if there is a winner
    handleResultValidation();
   }
}

//Instructions for when an empty cell is clicked
function handleCellPlayed(clickedCell, clickedCellIndex) {
    //Sets the value of the clicked cell to the current player
    gameState[clickedCellIndex] = currentPlayer;
    //Sets the text of the cell to the current player
    clickedCell.innerHTML = currentPlayer;
}

//Instructions for checking if there is a winner
function handleResultValidation() {
    
    let gameWon = false;

    //Listing win possibilities to check against in an array
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
   ];

   //Loop will check each win condition against the board. a,b,c will be set to cell locations and the loop will check
   //for the same value across the three cells
   for (let i = 0; i < 8; i++) {
       const winCondition = winningConditions[i];
       let a = gameState[winCondition[0]];
       let b = gameState[winCondition[1]];
       let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            gameWon = true;
            break
        }
    }
    
    //If the above loop determines a win, this will set the status message to show who won and end the game
    if (gameWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    //Sets a draw when there is no winner and the gameState has all values
    let roundDraw = !gameState.includes("");
    //If draw is determined. Displays draw message and ends the game
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
  
    //Function will switch players if there is no winner
    handlePlayerChange();
}

function handlePlayerChange() {
    //Checks the current player. If current player is X it will change current player to O. If current player
    //is not X, it will set the current player to X. 
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    //Sets the game status to show who's turn it is
    statusDisplay.innerHTML = currentPlayerTurn();
}

//Adds click event listener to the reset button and sets it to reset the board
resetButton.addEventListener('click', resetBoard);

//Resets board by reloading website to start over
function resetBoard() {
    window.location.reload(true);
}