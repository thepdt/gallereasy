class SubcategoryService {

    getSubcategories = () => {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/subcategories"
        return fetch(url).then(res => res.json())
    }

    getParentCategories() {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/categories"
        return fetch(url).then(res => res.json())
    }

    createSubcategory(subcategory) {
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/news/subcategories";
        return fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(subcategory)
        }).then(res => res.json());
    }

    updateSubcategory(subcategory) {
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/news/subcategories";
        return fetch(url, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(subcategory)
        }).then(res => res.json());
    }

    deleteSubcategory(id) {
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/news/subcategories/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        }).then(res => res.json());
    }
}

export default SubcategoryService;