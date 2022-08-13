//Q1: Wap to add a number to a string
let a="king";
let b=9;
console.log(a+b);
//addition in strings works as a concatenation

/*
Q2:Wap to find the data type of string in last question.
*/
console.log(typeof(a+b));

/*
Q3: Create a const object in javascript. Can you change
to hold a number later?
*/
const object={
    ram:22,
    shyam:34,
    krishna:56,
}
console.log(object);
//No, we cannot change it later to hold a number because
//const keyword does not allow updation of varibales. For ex:
//object=56 it will throw an error.
/*
Q4) Add a new key value pair to the object and initialise it with some value.
Also update the value of a key in the object.

*/
object["arjun"]=123;//Adding a new key and value to the object.
object["ram"]=1212;//Updating the value of a key in the object.
console.log(object);
/*
Q5:Wap to create a object to store the words and meanings of 5 words
*/
let j={
    ataraxi:"a state of freedom from emotional disturbance and anxiety",
    yakka:"work, especially hard work",
    appreciate:"recognise the full worth of"
}
console.log(j);