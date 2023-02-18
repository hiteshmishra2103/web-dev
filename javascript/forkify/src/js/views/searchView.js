//This file contains the presentation logic for the search functionality of the application

class SearchView {
  _parentElement = document.querySelector(".search");

  //getQuery method will get the search query typed by the user
  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    //Clearing the search bar input field
    this._clearInput();

    return query;
  }

  // function to clear the search bar input
  _clearInput() {
    return this._parentElement.querySelector(".search__field").value;
  }

  addHandlerSearch(handler) {
    //handler should be controlSearchResult function
    this._parentElement.addEventListener("submit", function (event) {
      event.preventDefault();
      handler();
    });
  }
}

//exporting the instance of SearchView class
export default new SearchView();
