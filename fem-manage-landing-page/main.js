const hamburger=document.querySelector('.hamburger');
const navlist=document.querySelector(".nav-list");
hamburger.addEventListener("click", function(){
    navlist.classList.toggle("active");
})