const mobileBtn = document.getElementById("mobilecta");
const nav = document.querySelector("nav");
const mobileBtnexit = document.getElementById("mobile-exit");
mobileBtn.addEventListener("click", function () {
  nav.classList.add("active");
});
mobileBtnexit.addEventListener("click", function(){
    nav.classList.remove("active");
})
