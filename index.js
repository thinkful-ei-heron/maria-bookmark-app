console.log(`index.js is working`);

$(function () {
    bookmarkBinder.handleBookmarks();
    bookmarkBinder.render();
    api.getItems((items) => {
        items.forEach(item => store.addItem(item));
        bookmarkBinder.render();
    });
});

