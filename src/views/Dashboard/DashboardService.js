class DashboardService {
    getCrawlStatusStatistic = (fromDate) => {
        const url = process.env.REACT_APP_BASE_URL_STATISTIC + "/statistic/post-status/" + String(fromDate)
        return fetch(url).then(res => res.json())
    }

    getPostErrorCodeStatistic = (fromDate) => {
        const url = process.env.REACT_APP_BASE_URL_STATISTIC + "/statistic/post-error-code/" + String(fromDate)
        return fetch(url).then(res => res.json())
    }

    getHotPostStatistic = () => {      
        const url = process.env.REACT_APP_BASE_URL_MANAGE + "/statistics?top=1"       
        return fetch(url).then(res => res.json())
    }
}

export default DashboardService;