class PostService {

    getPosts = (fromDate, toDate, pageIndex) => {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/posts?pageSize=10&pageIndex=" + pageIndex + "&from=" + fromDate + "&to=" + toDate
        return fetch(url).then(res => res.json())
    }

    getPostsByPublisher = (publisherId, pageIndex) => {
        const url =process.env.REACT_APP_BASE_URL_MANAGE + "/news/posts/search?publisherId=" + publisherId+ "&pageSize=10&pageIndex=" + pageIndex
        // http://18.136.201.129:9090/api/v1.0/news/posts/search?publisherId=eb10886f-8c0d-4b83-60be-87c1df7c9975&pageSize=10&pageIndex=1
        return fetch(url).then(res => res.json())
    }

    getPostByTitle = (title) => {
        const url =process.env.REACT_APP_BASE_URL_MANAGE + "/news/posts/search?keyword=" + title
        return fetch(url).then(res => res.json())
    }

    getNextPostsWithDate(date){
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/posts/next?nextIndex=" + date
        return fetch(url).then(res => res.json())
    }

    getPreviousPostsWithDate(date){
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/posts/previous?previousIndex=" + date
        return fetch(url).then(res => res.json())
    }

    createPost(post) {
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/news/posts";
        return fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        }).then(res => res.json());
    }

    updatePost(post) {
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/news/posts";
        return fetch(url, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        }).then(res => res.json());
    }

    deletePost(post) {
        const url =  process.env.REACT_APP_BASE_URL_MANAGE + "/news/post/delete/" + post.Id +"/"+post.Type;
        return fetch(url, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        }).then(res => res.json());
    }
}

export default PostService;