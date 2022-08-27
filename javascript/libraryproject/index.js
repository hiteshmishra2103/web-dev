//Constructors
function Book(name, author, type) {
  this.name = name;
  this.type = type;
  this.author=author;
}
//display constructor
function display() {}

//Add methods to display prototype

//Add event listener to form
let libraryForm = document.getElementById("libraryform");
libraryForm.addEventListener("submit", libraryFormSubmit);
const bookName = document.getElementById("bookName");
const authorName = document.getElementById("author");

function libraryFormSubmit(event) {
  event.preventDefault(); //to prevent the reloading of form when
  //clicking submit button.
  let name = bookName.value;
  let author = authorName.value;
  const fiction = document.getElementById("Fiction");
  const computerScience = document.getElementById("ComputerScience");
  const selfHelp = document.getElementById("Self-Help");
  let type;
  if(fiction.checked){
    type=fiction.value;
  }
  else if(computerScience.checked){
    type=computerScience.value;
  }
  else{
    type=selfHelp.value;
  }
  let book = new Book(name,author, type);
}
