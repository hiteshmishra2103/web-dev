/*This file is for declaring and initialising the variables and constants
which we used in our project along with event listeners.*/

const editPlayer1BtnElement=document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement=document.getElementById("edit-player-2-btn");
let editedPlayer=0;
let activePlayer=0;
//Selecting the active player name element to change the name of player 
//when the turn of that player comes.
const activePlayerNameElement=document.querySelector("#activeplayername");


//Making an array to store the player data so that we can use that data
//when a player wins

const players=[
    {
        name:"",
        symbol:"X"
    },
    {
        name:"",
        symbol:"O",
    },
];

//Tracking selected fields on the game board

const gameData=[
    [0,0,0],
    [0,0,0],
    [0,0,0],
];

let currentRound=1;

/*Interacting with forms variables */

const formElement=document.querySelector("form");
const inputFormElement=document.getElementById("Playername");
const errorOutputElement=document.querySelector("#config-errors");

//game variables


const gameAreaElement=document.getElementById("active-game");
const startNewGameBtnElement=document.getElementById("start-game-btn");

const playerConfigOverlayElement=document.getElementById("config-overlay");
const backdropElement=document.getElementById("backdrop");

const cancelConfigButtonElement=document.getElementById("cancel-config-btn");
const gameFieldElements=document.querySelectorAll("#game-board li");

const gameOverElement=document.getElementById("game-over");

editPlayer1BtnElement.addEventListener("click",OpenPlayerConfig);
editPlayer2BtnElement.addEventListener("click",OpenPlayerConfig);

cancelConfigButtonElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click",closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);
startNewGameBtnElement.addEventListener("click", startNewGame);

for(const gameFieldElement of gameFieldElements){
gameFieldElement.addEventListener("click", selectGameField);
}
