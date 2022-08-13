/*
There are two types of data types in javascript
1)Primitive data types 
2)Non-Primitive data types
*/

/* 
Primitive Data Types
-------------Trick to learn:- NNBBSSU-------------
N:Number(int)
N:NULL
B:bigInt
B:Boolean
S:String
S:Symbol
U:Undefined
*/

let a;
/*A variable in javascript can be declared by using "var" keyword for any 
data type*/
console.log(a);
console.log(typeof(a));
//typeof is used to know the data type of a variable
a=10;
console.log(a);
console.log(typeof(a));
a="king";
/*strings can be enclosed within double as well as single quotes
in Javascript we will use double quotes to maintain uniformity and 
strings are enclosed in double quotes in most of the languages, so it 
makes it easy for coding in other languages like c, c++*/ 
console.log(a);
console.log(typeof(a));
a=true;//here a is assigned with a boolean value i.e true or false
console.log(a);
console.log(typeof(a));
a=NaN;//NaN is short for not a number
console.log(a);
console.log(typeof(a));
a=[1,2,3,4,5,6];//You can declare an array like this in javascript
console.log(a);
console.log(typeof(a));/*data type of array is object
in javascript*/
a=a+"121";/*concatenation in strings, a was of type int but after
adding it with a string it is explicitly converted to string*/
console.log(a);
console.log(typeof(a));
let n=parseInt(prompt("Enter the first number: "));
let m=parseInt(prompt("Enter the second number: "));
/*prompt takes input as a string by default, that's why we explicitly 
converted it into int by using parseint*/
console.log(n+m);
console.log(typeof(n));

//---------Non primitive data types-----------//
//--Objects
/*
Objects in javascript are same as dictionary
are in python. They have key value pairs.
*/
let d= {
    "Ram": 121,
    "Shyam": 11,
};
console.log("Accessing the values of object d:\n")
console.log(d["Ram"]);
console.log(d["Shyam"]);