import { create } from 'apisauce'

const apiManage = create({
    //baseURL: "http://localhost:9090",
    baseURL: "http://18.136.201.129:9090/api/v1.0",
    headers: { 
        // Content-Type: "application/json",
        "Accept": "application/json" 
    }
});

const apiStatistic = create({
    // baseURL: "http://localhost:9091/crawl/v1.0",
    baseURL: "http://18.136.201.129:9091/crawl/v1.0",
    headers: { Accept: "application/json" }
});

const api = {apiManage: apiManage, apiStatistic: apiStatistic}


export default api