// // ADD AN ELEMENT
// // 1. Create the new HTML element
// let newAnchorElement=document.createElement('a');//It will create a new anchor element
// //We stored the value returned by document.createElement("a") in a variable, so that we could access it later.
// //Now you will not find the new anchor element in the DOM
// //It is just created and stored in the memory

// //--->It is where the step 2 and 3 comes into play.

// // 2. Get access to the parent element that should hold the new element
// let d=document.children[0];
// // 3. Insert the new element into the parent element content
// let c=d.append(newAnchorElement);
// newAnchorElement.href="https://udemy.com";
// newAnchorElement.textContent="This leads to udemy";

// //Remove elements
// // 1. Select the element that should be removed
// // 2. Remove it!
// newAnchorElement.remove();
// //Inserting 
// console.log(document.body.textContent);
// document.body.innerHTML="this is a <strong>inner html</strong>";
const div=document.createElement("h1");
document.body.append(div);
div.innerHTML="<Strong>This is created by javascript</strong>";