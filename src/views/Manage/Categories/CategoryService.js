class CategoryService {
    getCategories = () => {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/categories"
        return fetch(url).then(res => res.json())
    }

    createCategory(category) {
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/news/categories";
        // console.log(headers);
        return fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        }).then(res => res.json());
    }

    updateCategory(category) {
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/news/categories";
        return fetch(url, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        }).then(res => res.json());
    }

    deleteCategory(id) {
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/news/categories/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        }).then(res => res.json());
    }
}

export default CategoryService;