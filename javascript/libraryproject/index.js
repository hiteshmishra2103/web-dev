let libraryForm = document.getElementById("libraryform");
//Constructors
function Book(name, author, type) {
  this.name = name;
  this.type = type;
  this.author=author;
}
//display constructor
function Display() {

}

//Add methods to display prototype
Display.prototype.add=function(book){

}
Display.prototype.clear=function(){
libraryForm.reset();
}
//Add event listener to form
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
  let display=new Display();
  display.add(book);
  display.clear();
}
