const BASE_URL = "https://thinkful-list-api.herokuapp.com/maria";

const apiFetch = function (...args) {
   
    let error;
    return fetch(...args)
        .then(res => {
            if (!res.ok) {
                error = { code: res.status };
                if (!res.headers.get('content-type').includes('json')) {
                    error.message = res.statusText;
                    return Promise.reject(error);
                }
            }
            return res.json();
        })
        .then(data => {
            if (error) {
                error.message = data.message;
                return Promise.reject(error);
            }
            return data;
        });
};

const getItems = function () {
    return apiFetch(`${BASE_URL}/bookmarks`);
};

const createItem = function (title, url, desc, rating) {
    let data = {
        title: title,
        url: url,
        desc: desc, 
        rating: rating
    };
    return apiFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
};

const updateItem = function (id, updateData) {
    return apiFetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
    });
};

const deleteItem = function (id) {
    return apiFetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
};

export default {
    createItem,
    deleteItem,
    updateItem,
    getItems
};
