import View from './View';
import icons from '../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const pageNum = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    let curPage = this._data.page;

    console.log('page', curPage);

    //first and other pages
    if (curPage === 1 && pageNum > 1) {
      return `
        <button class="btn--inline pagination__btn--next">
         <span>Page ${curPage + 1}</span>
         <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
         </svg>
        </button>`;
    }

    //last page
    if (curPage === pageNum && pageNum > 1) {
      return `

        <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
        </button>
      
      `;
    }

    if (curPage < pageNum) {
      return `<button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
        </button>

        <button class="btn--inline pagination__btn--next">
         <span>Page ${curPage + 1}</span>
         <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
         </svg>
        </button>
      `;
    }
    //page 1  and there are pages
    return '';
  }
}

export default new PaginationView();
