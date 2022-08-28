
showNotes();
let addBtnElement=document.getElementById("addbtn");
addBtnElement.addEventListener("click", function(event){
    let addTxtElement=document.getElementById("addtxt");
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.push(addTxtElement.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxtElement.value="";
    console.log(notes);
    showNotes();
})
function showNotes(){
    let notes=  localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html=``;
    notesObj.forEach((element, index)=>{
        html+=`
        <div class="notecard  my-3 mx-3" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Note ${index+1}</h5>
                  <p class="card-text">${element}</p>
                  <button class="btn btn-primary">Delete Note</button>
                </div>
              </div>
        `
    })
    let notesElement=document.getElementById("notes");
    if (notesObj.length!=0){
        notesElement.innerHTML=html;
    }
    else{
        notesElement.innerHTML=`Nothing to show! Use "Add a Note" section above to add notes`;
    }
}