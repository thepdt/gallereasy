import api from './../../../Environment'

class SubcategoryService {

    getSubcategories = () => {
        const url = api.getBaseURL() + "/subcategories"
        return fetch(url).then(res => res.json())
    }

    getParentCategories() {
        const url = api.getBaseURL() + "/categories"
        return fetch(url).then(res => res.json())
    }

    createSubcategory(subcategory) {
        const url =  api.getBaseURL() + "/subcategories";
        return fetch(url, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify(subcategory)
        }).then(res => res.json());
    }

    updateSubcategory(subcategory) {
        const url =  api.getBaseURL() + "/subcategories";
        return fetch(url, {
            method: 'PUT',
            headers: api.headers,
            body: JSON.stringify(subcategory)
        }).then(res => res.json());
    }

    deleteSubcategory(id) {
        const url =  api.getBaseURL() + "/subcategories/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: api.headers,
        }).then(res => res.json());
    }
}

export default SubcategoryService;