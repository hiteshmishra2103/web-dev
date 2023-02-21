//Importing icons
import icons from "url:../../img/icons.svg"; //Parcel 2

//This file contains the code for showing the results for a search query

import View from "./View";

//importing preveiw view
import previewView from "./previewView";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");

  //errorMessage is the default error message, when the recipe is not found for the search query
  _errorMessage = "No bookmarks yet. Find a nice and bookmark it ;)";

  _message = "";

  //Generating the markup from the data fetched from the api for the search query with the help
  //of following function👇

  addHanlderRender(handler) {
    window.addEventListener("load", function () {
      handler();
    });
  }

  _generateMarkup() {
    // console.log(this._data);
    //We don't want to render the view on the screen instead we want to simply return the markup as
    //a string, to achieve this , we set the second argument as false
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();
