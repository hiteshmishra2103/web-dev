import View from "./View";

import icons from "url:../../img/icons.svg"; //Parcel 2

// class PaginationView extends View {
//   _parentElement = document.querySelector(".pagination");

//   _generateMarkup() {
//    const numPages=this._data.resu
//     //Page 1, and there are NO other pages
//     //Last Page, and there are NO other pages
//     //Other Pages, where there are previous as well as next pages
//   }
// }

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  //Adding event listener on pagination elements(prev, next buttons)
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (event) {
      const btn = event.target.closest(".btn--inline");
      console.log(btn);

      //Guard close,if there is no button then return ⭐
      //If we will not put guard clause, then it will throw error of reading properties of null

      if (!btn) return;
      //goToPage will store the value of the page where the user wants to go, we used data attribute
      //for achieving this
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      //Passing the value of page where the user wants to go as the argument to the handler function
      //which is the controlPagination
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;

    //Total num pages required for showing the recipes will be Math.ceil(totalRecipes/10)

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    //Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
      </button> 
      `;
    }

    //Last Page, and there are NO other pages

    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
       </button>`;
    }

    //Other Pages, where there are previous as well as next pages
    if (curPage < numPages && numPages > 1) {
      return `
  <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
  </button>
  <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
  <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
  </button>`;
    }

    //If above listed scenarios don't meet then it means there is only 1 page
    if (curPage === numPages) {
      return "";
    }
  }
}

export default new PaginationView();
