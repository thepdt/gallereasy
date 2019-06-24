class HotNewsService {

    getHotNews = (pageIndex) => {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/posts/hot?pageSize=10&pageIndex=" + pageIndex
        return fetch(url).then(res => res.json())
    }

    
}

export default HotNewsService;