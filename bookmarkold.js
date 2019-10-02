console.log(`bookmarks JS working`)

const bookmarkBinder = (function () {
    
  const generateForm = function () {
    let bookmarkForm =  ` <form class="bookmark-form">
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
    }
    
    const render = function () {
      renderError();

  //     let joinedHtmlBookmarks = items.map(obj => generateBookMarkHtml(obj));
  //     $('.js-generated-bookmarks').html(joinedHtmlBookmarks);
  // };    
    


    const generateBookmark = function (item) {
        if (obj.expanded === true) {
            return `<ul class="container-for-bookmarks" id="${item.id}">   
          <li class="bookmark-title">${item.title}</li>
          <div class="star-container">
          ${item.rating}  
          <div class ="everything-in-expanded">
            <div class="expanded-space">
                <div><div class="bookmark-details">
                <div class="bookmark-paragraph">
                  <div>
                   ${item.description}
                  </div>
                </div>
                  <div class="link-delete-container">
                      <a href="${item.url}">${item.url}</a>
                      
                      <button class="delete-button">DELETE</button>
                      <button class="edit-button">EDIT</button>
                  </div>
                  </div>
              
              <button class="show-details-bttn">Less Info!</button>
            </div>
            </div  
          </ul>
          </div>`;
          }
      
        if (obj.expanded === false) {
          return `<ul class="container-for-bookmarks" id="${item.id}">   
              <li class="bookmark-title">${item.title}</li>
              <div class="star-container">
              ${item.rating}
                
                <div class="expanded-view">
                    <div></div>
                  <button class="js-expanded-view">Show more</button>
                </div>  
                </ul>
                </div>`;
        }
    };

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
      } else {
        $('.error-container').empty();
      }
    };

    const handleGenerateForm= function () {
        $('.add-new-bookmark-button').on('click', function () {
          $('.js-add-form').html(generateForm());
            
        });
    };


  
    const handleBookMarkSubmit = function () {
      $('.add-new-bookmark-button').submit(function (event) {
        event.preventDefault();
        const newItemName = $('.js-generated-bookmark').val();
        $('.js-generated-bookmark').val('');
        api.createItem(newItem, (newItem) => {            
          store.addItem(newItem);
            render();
        }); 

      });

      renderError();
    }

    const findById = function (id) {
        let object = store.storedBookMarks.find(obj => obj.id === id);
        return object;
    };

    const handleShowMoreBotton = function () {
        $('.saved-bookmarks').on('click', '.js-expanded-view', function (event) {
          let thisItemID = getItemIdFromElement(event.currentTarget);
          
          let item = findById(itemId);
          item.expanded !==item.expanded;
          render();
        });
    };

    const handleBookmarks = function () {
        handleGenerateForm();
        handleBookMarkSubmit();
        handleShowMoreBotton();
    };

    return {
        render,
        handleBookmarks
    };    
}());