let inputElement=document.querySelector("input");
let count=60;
let update=document.getElementById("remainingchars")
function inputCount(event){
    let enteredText=event.target.value;
    let inputLength=enteredText.length;
    update.innerText=60-inputLength;
    if(inputLength>=0 && inputLength<=50){
     update.style.color="rgb(26,108,26)";
     inputElement.style.backgroundColor="white";
    }
    else if((60-inputLength)<=10) {
        update.style.color="red";
        inputElement.style.backgroundColor="red";
    }
}
inputElement.addEventListener("input",inputCount);