class AwardService {
    getAward =()=>{
        const url = process.env.REACT_APP_BASE_URL_MINIGAME+ "/prize-management/list?pageSize=10&pageIndex=1"   
        return fetch(url).then(res => res.json())
    }
    createAward(award){
        const url = process.env.REACT_APP_BASE_URL_MINIGAME  + "/prize-management/add" 
        return fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(award)
        }).then(res => res.json());
    }
    updateAward(award){        
        const url = process.env.REACT_APP_BASE_URL_MINIGAME  + "/prize-management/update" 
        return fetch(url, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(award)
        }).then(res => res.json());
   }
   deleteAward(id){        
    const url =  process.env.REACT_APP_BASE_URL_MINIGAME + "/prize-management/delete/" + id;
    return fetch(url, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    }).then(res => res.json());
}
}
export default AwardService;