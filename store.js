// 'use-strict'

// console.log(`store js is working`)

// const store = {
//     bookmarks: [
//       {
//         id: 'x56w',
//         title: 'Title 1',
//         rating: 3,
//         url: 'http://www.title1.com',
//         description: 'lorem ipsum dolor sit',
//         expanded: false
//       },
//       {
//         id: '6ffw',
//         title: 'Title 2',
//         rating: 5,
//         url: 'http://www.title2.com',
//         description: 'dolorum tempore deserunt',
//         expanded: false
//       } 
//     ],
//     adding: false,
//     error: null,
//     filter: 0
//   };

const store = (function () {
    const bookmarkStore = [];

    const bookmarks = [];

    const findById = function(id) {
        return this.items.find(item => item.id === id);
    };

    const addItem = function(item) {
        this.bookmarkStore.push(item);
    };
    
    
    const findAndDelete = function(id) {
        this.bookmarkStore = this.bookmarkStore.filter(item => item.id !== id);
    };
    
    
    
    
    
    return  {
        bookmarks,
        bookmarkStore,     
        editing: false,
        addItem,
        findById,
        findAndDelete,
    };

})();