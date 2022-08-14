//accessing element by DOM drilling
document.body.children[1].href='https://google.com';

//accessing elements by querying methods
let anchorElement=document.getElementById("anchor")
anchorElement.href='https://twitter.com'
//Query selector
let b=document.querySelector("#anchor");
b.href="https://india.com";
//Accessing <h1> element by "drilling into DOM" and
// save it in a variable with a name of your choice.
let a=document.body.children[0];
a.textContent="This is India!";
//select the "a" element with query selector
let c=document.querySelector("a");
c.href="https://tata.com";
