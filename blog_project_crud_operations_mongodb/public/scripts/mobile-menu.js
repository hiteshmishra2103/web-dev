const asideElement=document.getElementById("aside");

const navigationBar=document.querySelector("#main-header nav");

function toggleMobileMenu(){
    navigationBar.classList.toggle("open");
}

asideElement.addEventListener("click", toggleMobileMenu);