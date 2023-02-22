import View from "./View";

import icons from "url:../../img/icons.svg"; //Parcel 2

//This file contains the code for uploading the recipe from the user

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  //selecting the recipe window

  _message = "Recipe was successfully uploaded!";

  _window = document.querySelector(".add-recipe-window");

  //Selecting the overlay
  _overlay = document.querySelector(".overlay");

  //Selecting the button which when clicked will open the upload recipe window
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    //calling the show and hide addRecipe window
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  //function to show or toggle the addRecipe window
  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  //Function to show the addRecipeWindow when the user clicks on addRecipe button

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  //function to handle the form submisson for new recipe👇

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (event) {
      event.preventDefault();
      //We are under an event handler function and this will point to the form element

      //Destructuring the object and storing it in an array
      const dataArr = [...new FormData(this)];

      //converting the FormData to object
      const data = Object.fromEntries(dataArr);
      //   console.log(data);
      handler(data); 
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
