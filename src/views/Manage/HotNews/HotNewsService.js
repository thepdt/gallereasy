import api from './../../../Environment'

class HotNewsService {

    getHotNews = (pageIndex) => {
        const url = api.apiManage.getBaseURL() + "/news/posts/hot?pageSize=10&pageIndex=" + pageIndex
        return fetch(url).then(res => res.json())
    }

    
}

export default HotNewsService;