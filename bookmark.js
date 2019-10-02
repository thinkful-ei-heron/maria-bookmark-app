console.log(`bookmarks JS working`)

const bookmarkBinder = (function () {
    
    const generateBookmarkForm= function () {
        return ` <form class="bookmark-form">
          <span>New</span><input type="text" name="title" id="title" required />
          <span>URL</span><input type="text" name="url"  id="url" required/>
          <textarea rows='5' cols='50' required ></textarea>        
            <select id="select-rating" name="filter-by">
                   <option value="5"> 5 stars</option>
                   <option value="4"> 4 stars</option>
                   <option value="3"> 3 stars</option>
                   <option value="2"> 2 stars</option>
                   <option value="1"> 1 stars</option>
            </select>
            <button class="submit-button">Submit Form</button>
         </form>`;
    };

    const generateBookmarkResults = function (item) {
        if(item.expanded === true){
            return `<ul class="js-bookmark-elements" data-item-id="${obj.id}">   
            <li class="bookmark-title">${obj.title}</li>
            <div class="star-container">
            ${starHTML}  
            <div class ="everything-in-expanded">
              <div class="expanded-space">
                  <div><div class="bookmark-details">
                  <div class="bookmark-paragraph">
                    <div>
                     ${obj.desc}
                    </div>
                  </div>
                    <div class="link-delete-container">
                        <a href="${obj.url}">${obj.url}</a>
                        
                        <button class="js-delete-button">Delete Bookmark</button>
                        <button class="edit-button">EDIT</button>
                    </div>
                    </div>
                
                <button class="more-info-bttn">Condense</button>
              </div>
              </div  
            </ul>
            </div>`;
            }

        

        if(item.expanded !== true){
            return `<ul class="container-for-bookmarks" data-item-id="${obj.id}">   
            <li class="bookmark-title">${obj.title}</li>
            <div class="star-container">
            ${starHTML}
            
              <div class="expanded-space">
                  <div></div>
                <button class="more-info-bttn">Expand</button>
              </div>  
            </ul>
            </div>`;
        }
    };


    

        

    

    const generateBookmarkString = function (bookmark) {
        const items = bookmark.map((item) => generateBookmarkForm(item));
        return items.join('');
    }

    const generateError = function (message) {
        return `
        <section class="error-content">
          <button id="cancel-error">X</button>
          <p>${message}</p>
        </section>
      `;
    };

    const renderError = function () {
        if (store.error) {
            const el = generateError(store.error);
            $('.error-container').html(el);
        } 
        else {
            $('.error-container').empty();
        }
    };

    

    const handleCloseError = function () {
        $('.error-container').on('click', '#cancel-error', () => {
            store.setError(null);
            renderError();
        });
    };

    const render = function () {
        renderError();
        const bookmarkString = generateBookmarkString(items);
            $('.js-add-form').html(bookmarkString);// insert that HTML into the DOM
    };


    const handleNewItemSubmit = function () {
        $('.add-new-bookmark-button').submit(function (event) {
            event.preventDefault();
            const newItemName = $('.js-generated-bookmark').val();
            $('.js-generated-bookmark').val('');
            api.createItem(newItemName)
              .then((newItem) => {
                store.addItem(newItem);
                render();
              })
              .catch((err) => {
                store.setError(err.message);
                renderError();
            });
        });
    };
        

    const getItemIdFromElement = function (item) {
        return $(item)
        .closest('.js-bookmark-elements')
        .data('item-id');
    };

    const handleDeleteBookmark = function () {
        $('js-generated-bookmark').on('click', '.delete-button', event => {
            const id = getItemIdFromElement(event.currentTarget);
        
            api.deleteItem(id)
              .then(() => {
                store.findAndDelete(id);
                render();
              })
              .catch((err) => {
                console.log(err);
                store.setError(err.message);
                renderError();
            });
        });
    };


    const bindEventListeners = function () {
        handleNewItemSubmit();
        handleDeleteBookmark();
        handleCloseError();

    };
    return {
        render,
        bindEventListeners
    }





}());
