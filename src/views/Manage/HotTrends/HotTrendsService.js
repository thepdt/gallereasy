class HotTrendsService {

    getTrendsTilte = () => {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/posts/trend/title"
        return fetch(url).then(res => res.json())
    }

    getPostsTrend = (trendId, pageIndex) => {
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/news/posts/hot/" + trendId +"/trend?pageSize=10&pageIndex=" + pageIndex
        return fetch(url).then(res => res.json())
    }

    
}

export default HotTrendsService;