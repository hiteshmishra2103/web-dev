//Importing icons
import icons from "url:../../img/icons.svg"; //Parcel 2

//This file contains the code for showing the results for a search query

import View from "./View";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");

  //errorMessage is the default error message, when the recipe is not found for the search query
  _errorMessage =
    "No recipes found for your query😔! Please try searching other!";

  _message = "";

  //Generating the markup from the data fetched from the api for the search query with the help
  //of following function👇

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join("");
  }

  //Below function will be called for every result for search query in the _generateMarkup method
  //So that the all the respective will be loaded into the view

  _generateMarkupPreview(result) {
    return `
    <li class="preview">
            <a class="preview__link" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>`;
  }
}

export default new ResultsView();
