/* 
🌟 APP: Tip Calculator

These are the 3 functions you must use 👇
=========================================
calculateBill()
increasePeople()
decreasePeople()

These functions are hard coded in the HTML. So, you can't change their names.

These are all the DIV ID's you're gonna need access to 👇
========================================================
#1 ID 👉 'billTotalInput' = User input for bill total
#2 ID 👉 'tipInput' = User input for tip
#3 ID 👉 'numberOfPeople' = Current number of people you're splitting the bill between
#4 ID 👉 'perPersonTotal' = Total dollar value owed per person
*/
const billInputElement=document.querySelector("#billTotalInput");
const tipInputPercentageElement=document.getElementById("tipInput");
tipInputPercentageElement.value=0;
const numberOfPeopleElement=document.getElementById("numberOfPeople");
billInputElement.value=0;
numberOfPeopleElement.value=1;
// Get global access to all inputs / divs here (you'll need them later)
// bill input, tip input, number of people div, and per person total div



// Get number of people from number of people div


// ** Calculate the total bill per person **
const calculateBill = () => {
    // get bill from user input & convert it into a number
    const billInput=Number.parseInt(billInputElement.value);

    // get the tip from user & convert it into a percentage (divide by 100)
    tipInputPercentage=Number.parseInt(tipInputPercentageElement.value)/100;  
    // get the total tip amount
    const totalTipAmount=billInput*tipInputPercentage;
    // calculate the total (tip amount + bill)
    const totalAmount=billInput+totalTipAmount;
    // calculate the per person total (total divided by number of people)
    const perPersonTotalAmount=totalAmount/(Number.parseInt(numberOfPeopleElement.value));
    // update the perPersonTotal on DOM & show it to user
    if(billInputElement.value==""){
    const perPersonTotalElement=document.getElementById("perPersonTotal");
    perPersonTotalElement.innerText=`$0.00`;
    }
    else{
    const perPersonTotalElement=document.getElementById("perPersonTotal");
    perPersonTotalElement.innerText=`$${perPersonTotalAmount}`;
  }
}
  
  // ** Splits the bill between more people **
  const increasePeople = () => {
    if(billInputElement.value>0){
    // increment the amount of people
    numberOfPeopleElement.value++;
    // update the DOM with the new number of people
    numberOfPeopleElement.innerText=numberOfPeopleElement.value;
  
    // calculate the bill based on the new number of people
    calculateBill()}
  }
  
  // ** Splits the bill between fewer people **
  const decreasePeople = () => {
    // guard clause
    // if amount is 1 or less simply return
    // (a.k.a you can't decrease the number of people to 0 or negative!)
    if((numberOfPeopleElement.value)>1){
        numberOfPeopleElement.value--;
        numberOfPeopleElement.innerText=numberOfPeopleElement.value;
    }
    else{
        return;
    }
    // decrement the amount of people
  
  
    // update the DOM with the new number of people
    
    // calculate the bill based on the new number of people
    calculateBill()
  }