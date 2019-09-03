class AwardService {
    getAward =()=>{
        const url = process.env.REACT_APP_BASE_URL_MINIGAME+ "/prize-management/list?pageSize=10&pageIndex=1"   
        return fetch(url).then(res => res.json())
    }
    
}
export default AwardService;