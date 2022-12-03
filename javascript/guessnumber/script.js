"use strict";

console.log(document.querySelector(".message").textContent);

const random = Math.trunc(Math.random() * 20) + 1;

document.querySelector(".number").textContent = random;

let score = 20;

document.querySelector(".check").addEventListener("click", function () {
  const guessedNumber = Number(document.querySelector(".guess").value);
  if (score === 1) {
    if (guessedNumber === random) {
      document.querySelector(".message").textContent = "🎉 Correct Number!";
      document.querySelector(".score").textContent = ++score;
      return;
    } else {
      document.querySelector(".guess").setAttribute("readonly",true);
      document.querySelector(".number").style="width:40%";
      document.body.style="background-color:red";
      document.querySelector(".score").textContent = 0;
      document.querySelector(".message").textContent =
        "You lost the game! Try again by reloading the page!";
      return;
    }
  }
  if (guessedNumber === random) {
    document.querySelector(".message").textContent = "🎉 Correct Number!";
    document.querySelector(".number").style="width:40%";
    document.body.style="background-color:green";
    document.querySelector(".score").textContent = ++score;
  } else if (guessedNumber > random) {
    document.querySelector(".score").textContent = --score;
    document.querySelector(".message").textContent =
      "The number is less than your guessed number!";
  } else if (guessedNumber < random) {
    document.querySelector(".score").textContent = --score;
    document.querySelector(".message").textContent =
      "The number is greater than your guessed number!";
  }
  console.log(guessedNumber, typeof guessedNumber);
});

const playAgainBtn=document.querySelector('.again');

playAgainBtn.addEventListener(
    'click',function(){
        document.body.style="background-color:black";
        document.querySelector(".guess").value="";
        score=20;
        document.querySelector(".score").textContent=score;
    }
)
