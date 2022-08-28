showNotes();
let addBtnElement = document.getElementById("addbtn");
addBtnElement.addEventListener("click", function (event) {
  let addTxtElement = document.getElementById("addtxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxtElement.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxtElement.value = "";
  console.log(notes);
  showNotes();
});
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = ``;
  notesObj.forEach((element, index) => {
    html += `
        <div class="notecard  my-3 mx-3" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Note ${index + 1}</h5>
                  <p class="card-text">${element}</p>
                  <button id="${index}" class="btn btn-primary" onclick="deleteNote(this.id)" >Delete Note</button>
                </div>
              </div>
        `;
  });
  let notesElement = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElement.innerHTML = html;
  } else {
    notesElement.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes`;
  }
}

//function to delete notes
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1); //deleting the note by taking the index of the required div
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
const searchElement = document.getElementById("searchnotes");
searchElement.addEventListener("input", function (event) {
  let inputval = searchElement.value;
  //   console.log(inputval);
  let noteCardElement = document.getElementsByClassName("notecard");
  Array.from(noteCardElement).forEach((element) => {
    let cardText = element.children[0].children[1].innerText;
    if (cardText.includes(inputval)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
