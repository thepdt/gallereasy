import api from './../../../Environment'

class SubcategoryService {

    getSubcategories = () => {
        const url = api.apiManage.getBaseURL() + "/news/subcategories"
        return fetch(url).then(res => res.json())
    }

    getParentCategories() {
        const url = api.apiManage.getBaseURL() + "/news/categories"
        return fetch(url).then(res => res.json())
    }

    createSubcategory(subcategory) {
        const url =  api.apiManage.getBaseURL() + "/news/subcategories";
        return fetch(url, {
            method: 'POST',
            headers: api.apiManage.headers,
            body: JSON.stringify(subcategory)
        }).then(res => res.json());
    }

    updateSubcategory(subcategory) {
        const url =  api.apiManage.getBaseURL() + "/news/subcategories";
        return fetch(url, {
            method: 'PUT',
            headers: api.apiManage.headers,
            body: JSON.stringify(subcategory)
        }).then(res => res.json());
    }

    deleteSubcategory(id) {
        const url =  api.apiManage.getBaseURL() + "/news/subcategories/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: api.apiManage.headers,
        }).then(res => res.json());
    }
}

export default SubcategoryService;