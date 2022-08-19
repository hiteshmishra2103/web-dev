const editPlayer1BtnElement=document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement=document.getElementById("edit-player-2-btn");
let editedPlayer=0;
/*Interacting with forms variables */
const formElement=document.querySelector("form");
const inputFormElement=document.getElementById("Playername");
const errorOutputElement=document.querySelector("#config-errors");

const playerConfigOverlayElement=document.getElementById("config-overlay");
const backdropElement=document.getElementById("backdrop");

const cancelConfigButtonElement=document.getElementById("cancel-config-btn");

editPlayer1BtnElement.addEventListener("click",OpenPlayerConfig);
editPlayer2BtnElement.addEventListener("click",OpenPlayerConfig);

cancelConfigButtonElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click",closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);


