import api from './../../../Environment'

class PostService {

    getPosts = () => {
        const url = api.getBaseURL() + "/posts"
        return fetch(url).then(res => res.json())
    }

    getPostsByPublisher = (publisherId, pageIndex) => {
        const url = "http://18.136.201.129:9092/api/v1.0/post/publisher?pageSize=30&pageIndex=" + pageIndex + "&id=" + publisherId
        return fetch(url).then(res => res.json())
    }

    getPostDetailById = (postId) => {
        const url = "http://18.136.201.129:9092/api/v1.0/post/" + postId
        return fetch(url).then(res => res.json())
    }

    getNextPostsWithDate(date){
        const url = api.getBaseURL() + "/posts/next?nextIndex=" + date
        console.log("url: " + url);
        return fetch(url).then(res => res.json())
    }

    getPreviousPostsWithDate(date){
        const url = api.getBaseURL() + "/posts/previous?previousIndex=" + date
        console.log("url: " + url);
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