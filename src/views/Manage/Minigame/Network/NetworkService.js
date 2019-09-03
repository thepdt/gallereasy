class NetworkService {
    getNetwork = ()=>{
        const url = process.env.REACT_APP_BASE_URL_MINIGAME     
        
        return fetch(url).then(res => res.json())
    }
}
export default  NetworkService;