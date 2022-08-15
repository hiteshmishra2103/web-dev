let paragraphElement = document.body.children[0];
function changeParagraphText(){
    paragraphElement.textContent = "Clicked";
}
paragraphElement.addEventListener('click', changeParagraphText);
//just adding the name of function to the addEventListener will ensure that
// whenever the eventListener click will happen only then the function will
// called and work after it.