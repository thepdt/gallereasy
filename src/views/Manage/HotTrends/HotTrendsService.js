import api from './../../../Environment'

class HotTrendsService {

    getTrendsTilte = () => {
        const url = api.apiManage.getBaseURL() + "/news/posts/trend/title"
        return fetch(url).then(res => res.json())
    }

    getPostsTrend = (trendId, pageIndex) => {
        const url = api.apiManage.getBaseURL() + "/news/posts/hot/" + trendId +"/trend?pageSize=10&pageIndex=" + pageIndex
        return fetch(url).then(res => res.json())
    }

    
}

export default HotTrendsService;