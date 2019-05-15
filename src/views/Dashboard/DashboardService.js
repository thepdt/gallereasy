import api from './../../Environment'

class DashboardService {
    getCrawlStatusStatistic = (fromDate) => {
        const url = api.apiStatistic.getBaseURL() + "/statistic/" + String(fromDate)
        return fetch(url).then(res => res.json())
    }
}

export default DashboardService;