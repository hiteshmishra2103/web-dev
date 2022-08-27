
let count=0;
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
Display.prototype.validate=function(book){
    if(((book.name).length)>2 && ((book.author).length)>3){
        return 1;
    }
    else{
        return 0;
    }
}
Display.prototype.show=function(message){
 let messageElement=document.getElementById("message");
 if(message=="success"){
    messageElement.innerHTML=`<div class='alert alert-${message}' role='alert'> Your book has been successfully added.</div> <hr>`
 } 
 else{
    messageElement.innerHTML=`<div class='alert alert-${message}' role='alert'>Please fill the form properly!</div> <hr>`
}
setTimeout(() => {//to hide the message after displaying it for 4 seconds
    messageElement.innerHTML="";
}, 3000);
}

//Add methods to display prototype
Display.prototype.add=function(book){
const tablebody=document.getElementById("tablebody");
count++;
const yourBooks=` <tr>
<th scope="row">${count}</th>
<td>${book.name}</td>
<td>${book.author}</td>
<td>${book.type}</td>
</tr>`
tablebody.innerHTML+=yourBooks;
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
  if(display.validate(book)){
      display.add(book);
      display.clear();
      display.show('success');
    }
    else{
        display.show('danger');
    }
}

