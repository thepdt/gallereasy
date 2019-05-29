import api from './../../../Environment'

class PostService {

    getPosts = (fromDate, toDate, pageIndex) => {
        const url = api.apiManage.getBaseURL() + "/news/posts?pageSize=10&pageIndex=" + pageIndex + "&from=" + fromDate + "&to=" + toDate
        return fetch(url).then(res => res.json())
    }

    getPostsByPublisher = (publisherId, pageIndex) => {
        const url =api.apiManage.getBaseURL() + "/news/posts/search?publisherId=" + publisherId+ "&pageSize=10&pageIndex=" + pageIndex
        // http://18.136.201.129:9090/api/v1.0/news/posts/search?publisherId=eb10886f-8c0d-4b83-60be-87c1df7c9975&pageSize=10&pageIndex=1
        return fetch(url).then(res => res.json())
    }

    getPostByTitle = (title) => {
        const url =api.apiManage.getBaseURL() + "/news/posts/search?keyword=" + title
        return fetch(url).then(res => res.json())
    }

    getNextPostsWithDate(date){
        const url = api.apiManage.getBaseURL() + "/news/posts/next?nextIndex=" + date
        return fetch(url).then(res => res.json())
    }

    getPreviousPostsWithDate(date){
        const url = api.apiManage.getBaseURL() + "/news/posts/previous?previousIndex=" + date
        return fetch(url).then(res => res.json())
    }

    createPost(post) {
        const url =  api.apiManage.getBaseURL() + "/news/posts";
        return fetch(url, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify(post)
        }).then(res => res.json());
    }

    updatePost(post) {
        const url =  api.apiManage.getBaseURL() + "/news/posts";
        return fetch(url, {
            method: 'PUT',
            headers: api.headers,
            body: JSON.stringify(post)
        }).then(res => res.json());
    }

    deletePost(id) {
        const url =  api.apiManage.getBaseURL() + "/news/posts/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: api.headers,
        }).then(res => res.json());
    }
}

export default PostService;