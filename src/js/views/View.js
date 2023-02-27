import icons from '../../img/icons.svg';
export default class View {
  _data;
  /**
   * render recived object to the dom
   * @param {Object | Object[]} data the data to be rendered
   * @param {boolean} [render = true] = if false, create  markup string of rendering to the DOM
   * @returns
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markUp = this._generateMarkup();

    if (!render) return markUp;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkUp);
    const newElememts = Array.from(newDom.querySelectorAll('*'));

    const curElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElememts.forEach((newEl, index) => {
      const curEl = curElement[index];

      //updateText Cchanged

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      //updarte changed attribute

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markUp = `
      <div class="spinner">
       <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
      </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderError(message = this._errorMessage) {
    const markUp = `
      <div class="error">
         <div>
           <svg>
            <use href="${icons}#icon-alert-triangle"></use>
           </svg>
          </div>
          <p>${message}</p>
    </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderMassage(message = this._message) {
    const markUp = `
      <div class="error">
         <div>
           <svg>
            <use href="${icons}#icon-smile"></use>
           </svg>
          </div>
          <p>${message}</p>
    </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
