/* This file is responsible for the game logic */

function startNewGame(event) {
    //to check whether user has entered custom names
    if (players[0].name === "" && players[1].name === "") {
        alert("Enter custom user name by clicking on Edit name option.");
        return;
    }
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
    console.log(winnerId);

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

//logic for checking whether the game has been completed
//or not, I have used 9 because there are

else if(currentRound===9){
    return -1;
}
else{
    return 0;
}


}