let name="string";

//toUpperCase() and toLowerCase() methods
console.log(name.toUpperCase());
console.log(name.toLowerCase());

//slice() method
console.log(name.slice(1,3));//prints "tr"
console.log(name.slice(2));//It will print from index 2 to end of string

//.repalce() method: it is used to replace a piece of data from a string 
// with another data. For ex:

console.log(name.replace("str", "k"));//It will replace "str" with "k"
// to name string

//Concat() method: It is used to add one string to another, you can
//add multiple strings together 

console.log(name.concat(" is a friend of"," king"));//Output: string is a friend of king.
console.log(name.concat(" is a friend of"," king", " ha","ha","ha"));

//trim() method is used to remove extra whitespaces from the string
//Note: It only removes the whitespace in starting and from the ending
//It does not removes whitespace from in between the characters
//for ex: "  king is   ":it will return "king is", it will not remove
//whitespace in between the "king" and "is".

let dummyText= "    asdfasdf asdf as df adf asf       ";
console.log(dummyText.trim());

//includes() method: It returns true if the word present inside includes()
//else it returns false

dummyText="The quick brown fox jumps over the lazy dog."
console.log(dummyText.includes("fox"))//Output: True=> bcz fox is present in the 
//string dummyText

//Problem 
let str2="please give 1000";
let amount=Number.parseInt(str2.slice(("please give".length)+1));
console.log(amount);

//startsWith(): The startsWith() method determines whether a string begins with the characters of a 
//specified string, returning true or false as appropriate.
str1 = 'Saturday night plans';

console.log(str1.startsWith('Sat'));
// expected output: true

console.log(str1.startsWith('Sat', 3));
// expected output: false


//endsWith():

str1 = 'Cats are the best!';

console.log(str1.endsWith('best!'));
// expected output: true

console.log(str1.endsWith('best', 17));
// expected output: true

str2 = 'Is this a question?';

console.log(str2.endsWith('question'));
// expected output: false

