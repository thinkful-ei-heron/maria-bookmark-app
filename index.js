console.log(`index.js is working`);

const main = function () {
    bookmark.bindEventListeners();
    bookmark.render();
    
    api.getItems()
      .then((items) => {
        items.forEach((item) => store.addItem(item));
        shoppingList.render();
      });

  };
  
  $(main);
  