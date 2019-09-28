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

    getPostByCategory(categoryCode, pageIndex, lastId){
        
        if (pageIndex === 1) {
            const url = process.env.REACT_APP_BASE_URL_WEB_API + "/profile/:profileId/categories/"+ categoryCode +"/posts?pageSize=10&pageIndex=1"
            return fetch(url).then(res =>res.json())
        }
        else{
            const url = process.env.REACT_APP_BASE_URL_WEB_API + "/profile/:profileId/categories/"+ categoryCode +"/posts?pageSize=10&pageIndex=" + pageIndex + "&lastId=" +lastId
            return fetch(url).then(res =>res.json())
        }        
        
    }
    getHotPostByCategory(pageIndex){
        const  url = process.env.REACT_APP_BASE_URL_WEB_API + "/profile/:profileId/posts/hot/web?pageIndex="+ pageIndex
        return fetch(url).then(res =>res.json())
    }
    handlePinTop(id){
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/news/posts/pin/top/" + id;
        return fetch(url,{
            method :"POST",
            hearders: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        }).then(res => res.json());
    }
}

export default CategoryService;