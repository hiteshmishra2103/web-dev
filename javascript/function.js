//wap to add two numbers using functions in javascript
let a=parseInt(prompt("Enter your age: "));
function adultYears(age){
/*
Functionx in javascript are declared by keyword function
*/
    return age-18;
}
let adultAge=adultYears(a);
if(adultAge<0){
    alert("You are below eighteen.");
}
else if(adultAge==0){
    alert("You are eighteen.");
}
else{
    alert("Your adult years are: " +adultAge);
}
