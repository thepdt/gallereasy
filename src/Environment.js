import { create } from 'apisauce'

const api = create({
    //baseURL: "http://10.1.110.33:9090",
    //baseURL: "http://localhost:9090",
    baseURL: "http://18.136.201.129:9090",
    headers: { Accept: "application/json" }
});

export default api