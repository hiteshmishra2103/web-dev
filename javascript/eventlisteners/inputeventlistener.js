let inputElement=document.querySelector("input");

function retrieveUserInput(event){//This event object is automatically placed by browser whether
    //the developer gives a parameter or not. Event object will be always present.
    // let enteredText=inputElement.value;
    let enteredText=event.data;//accessing the value entered by the user to the input element
    console.log(enteredText);//printing the value which was input by user
    console.log(event);
    /*
    It prints the automatically generated event object to the
    console that contains the properties describing the event that occurred.
    */
    // console.log(count);//printing the no. of input values
}
inputElement.addEventListener("input",retrieveUserInput);