let divElement=document.createElement("div");
let text=document.createTextNode("You can edit this text by clicking on it!") 
divElement.appendChild(text)
let containerDiv=document.getElementsByClassName("container");
divElement.setAttribute("id", "div");
let first=document.getElementById("first");
divElement.setAttribute("style", "color:white; background-color:red; width:10rem; height:fit-content;");
first.appendChild(divElement);

divElement.addEventListener("click", function(){
    let noOfTextAreas=document.querySelectorAll("#textarea").length;
    if(noOfTextAreas==0){
    let html=divElement.innerText;
    divElement.innerHTML=` <textarea name="" id="textarea" cols="15" rows="4">${divElement.innerText}</textarea>`;
}
})