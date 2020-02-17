import api from './api.js';
import store from './store.js';

function generateBookmarkForm() {
    return`
    <form id="bookmark-form">
    <label for="title">
        <input class="bk-title" name="title" type="text" placeholder="Animal Farm" required/>
    </label>
    <label for="url">
        <input class="bk-url" name="url" type="text" placeholder="www."required/>
    </label>
    <label for="desc">
        <textarea class="bk-desc" name="desc" type="text" placeholder="add description (optional)"></textarea>
    </label>

    <button class= "form-btn" type="submit">Submit</button>
    </form>
    `
};

function generateItemElement(item) {
    if (item.expanded) {
        return `
            <ul class="new-bk" data-item-id="${item.id}">
                <li id="title">${item.title}</li>
                <li>Rating: ${item.rating}</li>
                <li><a href="${item.url}">Visit Page</a></li>
                <li>${item.desc}</li>
                <button class="delete-bookmark-button">Delete Bookmark</button>
            </ul>`;
    }
    else {
        return `
            <ul class="new-bk" data-item-id="${item.id}">
                <li id="title">${item.title}</li>
                <li>Rating: ${item.rating}</li>
            </ul>`
    }
};

function generateBookmarkItemString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
};

function render() {
    console.log('render working');
    let items = store.bookmarks;
    $('.form-here').html(generateBookmarkForm());

    if(store.adding){
        $('.form-here').show();
    } else {
        $('.form-here').hide();
    }
    
    if (store.filterRating >= 1) {
        items = store.bookmarks.filter(bookmark => bookmark.rating >= store.filterRating);
        //console.log(`item in render ${items}`);
    }

    const bookmarklistItemsString = generateBookmarkItemString(items);
    $('.bookmark-list').html(bookmarklistItemsString);
};

function handleBookmarkSubmit() {
    $('.form-here').on('submit', '#bookmark-form', event => {
        event.preventDefault();
        console.log("working");
        let bookmarkTitle = $('.bk-title').val();
        
        let bookmarkURL = $('.bk-url').val();
        
        let bookmarkDesc = $('.bk-desc').val();
        
        let bookmarkRating = parseInt($('.bk-rating').val(), 10);
        $('.bk-rating').val('');

        api.createItem(bookmarkTitle, bookmarkURL, bookmarkDesc, bookmarkRating)
            .then(items => {
                store.addItems(items);
                store.addingBk();
                render();
            })
            .catch(
                err => {
                console.log(err)
                store.setError(err);
                render();
            });
    });
};

function serializeJson(form) {
    const formData = new FormData(form);
    const obj = {};
    formData.forEach((val, name) => obj[name] = val);
    return JSON.stringify(obj);
};

$('#bookmark-results').submit(event => {
    event.preventDefault();
    let formElement = $('#form-results')[0];
    console.log( serializeJson(formElement) );
});

function handleAddBookmarkClick() {
    $('.addBookmark').on('click', function () {
        store.addingBk();
        render();
    })
};

function handleBookmarkDelete() {
    $('.bookmark-list').on('click', '.delete-bookmark-button', event => {
        const id = getItemIdFromElement(event.target);
        console.log(id);
        api.deleteItem(id)
            .then(()=> {
                store.findAndDelete(id);
                render();        
        })
    })
};

function generateError(message) {
    return `
        <section class="error-content">
          <button id="cancel-error">X</button>
          <p>${message}</p>
        </section>
      `;
};

function renderError() {
    if (store.error) {
      const el = generateError(store.error);
      $('.error-here').html(el);
    } else {
      $('.error-here').empty();
    }
};

function getItemIdFromElement(item) {
    return $(item).closest('.new-bk').data('item-id');
};

function handleCloseError() {
    $('.error-here').on('click', '#cancel-error', () => {
        store.setError(null);
        renderError();
    })
};

function handleRatingFilterClick() {
    $('.select-rating').on('change', function () {
        const selection = parseInt($(this).val(), 10);
        store.filterRating = selection;
        render();
    })
};

function bkExpand(title) {
    const foundBookmark = store.bookmarks.find(bookmark => bookmark.title === title);
    foundBookmark.expanded = !foundBookmark.expanded;
    render();
};

function handleBookmarkClick() {
    $('.bookmark-list').on('click', 'ul', function (event) {
        const title = $(this).find('#title').text()
        bkExpand(title);
        render();
    })
};

function bindEventListeners() {
    handleBookmarkDelete();
    handleCloseError();
    handleBookmarkClick();
    handleAddBookmarkClick()
    handleBookmarkSubmit();
    handleRatingFilterClick();
    generateBookmarkForm();
    renderError();
};

export default {
    render,
    bindEventListeners
};