import api from './api.js';
import store from './store.js';
import bookmarklist from './bookmarklist.js';


const main = function () {
  api.getItems()
    .then(items => {
      console.log('items:', items);
      items.map(item => {
        store.addItems(item);
      })
      bookmarklist.render();
      bookmarklist.bindEventListeners();
    })
};

$(main);
