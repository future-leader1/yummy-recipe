import View from './View';
import icons from '../../img/icons.svg';
import previewView from './previewView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `no bookmars yet. find nice recepie and bookmark it`;
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler());
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
