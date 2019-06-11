import api from './../../Environment'

class DashboardService {
    getCrawlStatusStatistic = (fromDate) => {
        const url = api.apiStatistic.getBaseURL() + "/statistic/post-status/" + String(fromDate)
        return fetch(url).then(res => res.json())
    }

    getPostErrorCodeStatistic = (fromDate) => {
        const url = api.apiStatistic.getBaseURL() + "/statistic/post-error-code/" + String(fromDate)
        return fetch(url).then(res => res.json())
    }

    getHotPostStatistic = () => {
        const url = api.apiManage.getBaseURL() + "/statistics?top=1"
        return fetch(url).then(res => res.json())
    }
}

export default DashboardService;