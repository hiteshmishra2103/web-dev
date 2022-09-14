const weddingButtonElement=document.querySelector(".weddingbtn")
const fashionButtonElement=document.querySelector(".fashionbtn")
const natureButtonElement=document.querySelector(".naturebtn");

const allButtonElement=document.querySelector(".allbtn");

allButtonElement.addEventListener("click", filtergallery);
weddingButtonElement.addEventListener("click", filtergallery);
fashionButtonElement.addEventListener("click", filtergallery);
natureButtonElement.addEventListener("click", filtergallery);

const naturePhotosElement=document.querySelectorAll(".nature");
const fashionPhotosElement=document.querySelectorAll(".fashion");
const weddingPhotosElement=document.querySelectorAll(".wedding");

function filtergallery(event){
    console.log(event);
if(event.target.value==1){
    weddingButtonElement.classList.remove("active");
    fashionButtonElement.classList.remove("active");
    allButtonElement.classList.remove("active");
    natureButtonElement.classList.add("active");
    fashionPhotosElement.forEach(element => {
        element.style.display="none";
    });
    weddingPhotosElement.forEach(element => {
        element.style.display="none";
    });
    naturePhotosElement.forEach(element => {
        element.style.display="";
    });
}
else if(event.target.value==2){
    natureButtonElement.classList.remove("active");
    weddingButtonElement.classList.remove("active");
    allButtonElement.classList.remove("active");
    fashionButtonElement.classList.add("active");
    naturePhotosElement.forEach(element => {
        element.style.display="none";
    });
    weddingPhotosElement.forEach(element => {
        element.style.display="none";
    });
    fashionPhotosElement.forEach(element => {
        element.style.display="";
    });
}
else if(event.target.value==3){
    natureButtonElement.classList.remove("active");
    fashionButtonElement.classList.remove("active");
    allButtonElement.classList.remove("active");
    weddingButtonElement.classList.add("active");
    naturePhotosElement.forEach(element => {
        element.style.display="none";
    });
    fashionPhotosElement.forEach(element => {
        element.style.display="none";
    });
    weddingPhotosElement.forEach(element => {
        element.style.display="";
    });
}
else if(event.target.value==0){
    natureButtonElement.classList.remove("active");
    fashionButtonElement.classList.remove("active");
    weddingButtonElement.classList.remove("active");
    allButtonElement.classList.add("active");
    naturePhotosElement.forEach(element => {
        element.style.display="";
    });
    fashionPhotosElement.forEach(element => {
        element.style.display="";
    });
    weddingPhotosElement.forEach(element => {
        element.style.display="";
    });
}}
