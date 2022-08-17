const inputElement = document.querySelector("input");
const firstButton = document.querySelector("button");


function inputValue(event) {
    let sum = 0;
    const inputData = event.target.value;
    if (inputData >= 0) {
        for (let i = 0; i <= inputData; i++) {
            sum = sum + i;
        }
    }
    else if (inputData < 0) {
        for (let i = 0; i >= inputData; i--) {
            sum = sum + i;
        }
    }
    a.innerText = sum;
}
let a = document.getElementById("calculated-sum");
function showSum(event) {

    a.style.display = "block";

}
inputElement.addEventListener("input", inputValue);
firstButton.addEventListener("click", showSum);
let secondButton = document.body.children[2].children[1];
function highlightAllLinks(event) {
    let allLinks = document.querySelectorAll("a");
    for (let i of allLinks) {
        i.classList.add("highlight");
    }
}
const dummyUserData = {
    name: "john",
    Age: 99,
    class: 14,
};
secondButton.addEventListener("click", highlightAllLinks);
let thirdButton = document.getElementById("thirdbutton");

let displayUserDataButtonElement = document.querySelector("#user-data button");
let outputUserData = document.querySelector("#output-user-data");
function displayUserData() {
    for (let i in dummyUserData) {
        const listItem = document.createElement("li");
        const outputText = i.toUpperCase() + ": " + dummyUserData[i];
        listItem.textContent = outputText;
        displayUserDataButtonElement.append(listItem);
    }
}
displayUserDataButtonElement.addEventListener("click", displayUserData);

//Roll dice

let fourthButton = document.body.children[4].children[3];


function rollDice(event) {
    return (Math.floor(Math.random() * 6));//important, Math.random() is taking for using random numbers
}
const userNumberTargetinput = document.querySelector("#user-target-number");
const newRollListItemElement=document.createElement("li");
function diceRolls(event) {
    const diceRollsListElement=document.getElementById("dice-rolls");
    
    const enteredNumber = userNumberTargetinput.value;
    diceRollsListElement.innerHTML=" ";

    let hasRolledTargetNumber = false;
    let noOfRolls = 0;

    while (!hasRolledTargetNumber) {
        noOfRolls++;
        let rolledNumber = rollDice();
        const outputText='Roll'+noOfRolls+':'+rolledNumber;
        newRollListItemElement.atext
        // if (rolledNumber == enteredNumber) {
        //     hasRolledTargetNumber = true;
        // }
        hasRolledTargetNumber=rolledNumber==enteredNumber;
    }
    const outputTotalRolls = document.querySelector("#output-total-rolls");
    const outputTargetNumber = document.getElementById("output-target-number");
    outputTargetNumber.textContent = enteredNumber;
    outputTotalRolls.textContent = noOfRolls;
    diceRollsListElement.append(newRollListItemElement);
}
userNumberTargetinput.addEventListener("input", rollDice);
fourthButton.addEventListener("click", diceRolls);