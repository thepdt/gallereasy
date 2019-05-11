import api from './../../../Environment'

class CategoryService {
    getCategories = () => {
        const url = api.apiManage.getBaseURL() + "/categories"
        return fetch(url).then(res => res.json())
    }

    createCategory(category) {
        const url =  api.apiManage.getBaseURL() + "/categories";
        return fetch(url, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify(category)
        }).then(res => res.json());
    }

    updateCategory(category) {
        const url =  api.apiManage.getBaseURL() + "/categories";
        return fetch(url, {
            method: 'PUT',
            headers: api.headers,
            body: JSON.stringify(category)
        }).then(res => res.json());
    }

    deleteCategory(id) {
        const url =  api.apiManage.getBaseURL() + "/categories/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: api.headers,
        }).then(res => res.json());
    }
}

export default CategoryService;