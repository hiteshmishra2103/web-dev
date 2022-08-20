/* This file is responsible for the game logic */

function resetGame(){
    activePlayer=0;//setting active player to 0(first player)
    currentRound=1;//setting current round to first round of game
    
    //setting the game over box to default state and display none
    gameOverElement.firstElementChild.innerHTML='You won,<span id="winner-name"> Messi</span>!';
    gameOverElement.style.display="none";

    //resetting the gameData array to all elements with value 0
    
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            gameData[i][j]=0;
        }
    }

    //initialising the li items to empty, so that new entries 
//could be done
    for(let i of gameFieldElements){
        i.textContent="";

        // removing all the disabled class from all the li items so that
//user could interact with them
        i.classList.remove("disabled");
    }

}


function startNewGame(event) {
    //to check whether user has entered custom names
    if (players[0].name === "" && players[1].name === "") {
        alert("Enter custom user name by clicking on Edit name option.");
        return;
    }
    resetGame()
    gameAreaElement.style.display = "block";
    //this statement will only execute when user will enter custom username
    activePlayerNameElement.textContent = players[activePlayer].name;
}


//Adding function to switch the player turns

function switchPlayer(event) {
    if (activePlayer == 0) {
        activePlayer = 1;
    }
    else {
        activePlayer = 0;
    }
    //Showing the name of player when turn of that player comes.
    activePlayerNameElement.textContent = players[activePlayer].name;

}

function selectGameField(event) {

    const selectedField = event.target;
    //it will select the li element which is being clicked on by the user


    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    //logic for not allowing the user to click on the 
    //selected game board to change their symbol

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert("Please select an empty box!")
        return;//We use return in order to not allow other 
        //statements after return to execute.
        //here the 
    }


    selectedField.textContent = players[activePlayer].symbol;
    activePlayerNameElement.textContent = players[activePlayer].name;

    // adding disabled class so that the user will not
    // be able to reclick over the already selected element
    selectedField.classList.add("disabled");


    //updating the gameData array for every user click on gameboard
    //We are using gameData array so that we could apply logic for game easily by traversing on arrays

    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    const winnerId=checkForGameOver()
   
    
//currentRound++ is added before switchplayer() and after checkForGameOver()
//to keep record of every iteration of checkForGameOver(). You

if(winnerId!==0){
    endGame(winnerId);
}

   currentRound++;
   switchPlayer();//For changing turns of players
}

//function to check the game result

//checking whether the user has selected 3 boxes in a row
//with same symbol

function checkForGameOver(event) {
    for (let i = 0; i < 3; i++) {
        if (gameData[i][0] > 0 && 
            gameData[i][0]===gameData[i][1]
            && gameData[i][1]===gameData[i][2]){
                
            return gameData[i][0];
        }
    }

//checking whether the user has selected 3 boxes in a column
//with same symbol


    for (let i = 0; i < 3; i++) {
        if (gameData[0][i] > 0 && 
            gameData[0][i]===gameData[1][i]&&
            gameData[1][i]===gameData[2][i])
            {
            return gameData[0][i];
        }
    }
//Checking for left diagonal 

if(gameData[0][0]>0
    && gameData[0][0]===gameData[1][1]
    && gameData[1][1]===gameData[2][2])
    {

        return gameData[0][0];
}
//checking for right diagonal

else if(gameData[0][2]>0 
    && gameData[0][2]===gameData[1][1]
    &&gameData[1][1]===gameData[2][0])
    {
        return gameData[0][2];
}

// Logic for checking whether the game has been completed and 
// the game result is draw or not, I have used 9 because
// there are 9 boxes for playing

else if(currentRound===9){
    return -1;
}
else{
    return 0;
}

}

function endGame(winnerId){
    gameOverElement.style.display="block";
    if(winnerId>0){
    const winnerName=players[winnerId-1].name;
    //to display the winner name if the game is not draw
    gameOverElement.firstElementChild.firstElementChild.textContent=winnerName;
    //to display the game-over window when the game is finished
    
}

    else{
        gameOverElement.firstElementChild.textContent="It\'s a draw!";
    }
}