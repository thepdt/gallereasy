import api from './../../../Environment'

class CategoryService {
    getCategories = () => {
        const url = api.apiManage.getBaseURL() + "/news/categories"
        return fetch(url).then(res => res.json())
    }

    createCategory(category) {
        const url =  api.apiManage.getBaseURL() + "/news/categories";
        // console.log(headers);
        return fetch(url, {
            method: 'POST',
            headers: api.apiManage.headers,
            body: JSON.stringify(category)
        }).then(res => res.json());
    }

    updateCategory(category) {
        const url =  api.apiManage.getBaseURL() + "/news/categories";
        return fetch(url, {
            method: 'PUT',
            headers: api.apiManage.headers,
            body: JSON.stringify(category)
        }).then(res => res.json());
    }

    deleteCategory(id) {
        const url =  api.apiManage.getBaseURL() + "/news/categories/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: api.apiManage.headers,
        }).then(res => res.json());
    }
}

export default CategoryService;