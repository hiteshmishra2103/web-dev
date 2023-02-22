//Importing icons
import icons from "url:../../img/icons.svg"; //Parcel 2

//this file contains the code which is same in resultsView as well as bookmarksView

import View from "./View";

class PreviewView extends View {
  _parentElement = "";

  //Below function will be called for every result for search query in the _generateMarkup method
  //So that the all the respective will be loaded into the view

  _generateMarkup() {
    //Selecting the current recipe id
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
            <a class="preview__link ${
              this._data.id === id ? "preview__link--active" : ""
            }" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
                <div class="preview__user-generated ${
                  this._data.key ? "" : "hidden"
                }">
                  <svg>
                  <use href="${icons}#icon-user"></use>
                  </svg>
              </div>  
           </div>
            </a>
          </li>`;
  }
}

export default new PreviewView();
