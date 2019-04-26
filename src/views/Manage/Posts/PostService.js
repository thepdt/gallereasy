import api from './../../../Environment'

class PostService {

    getPosts = (fromDate, toDate, pageIndex) => {
        const url = api.getBaseURL() + "/posts?pageSize=10&pageIndex=" + pageIndex + "&from=" + fromDate + "&to=" + toDate
        console.log(url);
        return fetch(url).then(res => res.json())
    }

    getPostsByPublisher = (publisherId, pageIndex) => {
        const url =api.getBaseURL() + "/posts/publisher?pageSize=10&pageIndex=" + pageIndex + "&publisherId=" + publisherId
        return fetch(url).then(res => res.json())
    }

    getPostByTitle = (title) => {
        const url =api.getBaseURL() + "/posts/publisher?search=" + title
        return fetch(url).then(res => res.json())
    }

    getNextPostsWithDate(date){
        const url = api.getBaseURL() + "/posts/next?nextIndex=" + date
        return fetch(url).then(res => res.json())
    }

    getPreviousPostsWithDate(date){
        const url = api.getBaseURL() + "/posts/previous?previousIndex=" + date
        return fetch(url).then(res => res.json())
    }

    createPost(post) {
        const url =  api.getBaseURL() + "/posts";
        return fetch(url, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify(post)
        }).then(res => res.json());
    }

    updatePost(post) {
        const url =  api.getBaseURL() + "/posts";
        return fetch(url, {
            method: 'PUT',
            headers: api.headers,
            body: JSON.stringify(post)
        }).then(res => res.json());
    }

    deletePost(id) {
        const url =  api.getBaseURL() + "/posts/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: api.headers,
        }).then(res => res.json());
    }
}

export default PostService;