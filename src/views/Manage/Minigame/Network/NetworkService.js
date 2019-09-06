class NetworkService {
    getNetwork = ()=>{
        const url = process.env.REACT_APP_BASE_URL_MINIGAME + '/mobile-card-vendor/list/all'            
        return fetch(url).then(res => res.json())
    }
    createNetwork(network){
        const url = process.env.REACT_APP_BASE_URL_MINIGAME  + "/mobile-card-vendor/add" 
        return fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(network)
        }).then(res => res.json());
    }
    updateNetwork(network){        
        const url = process.env.REACT_APP_BASE_URL_MINIGAME  + "/mobile-card-vendor/update" 
        return fetch(url, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(network)
        }).then(res => res.json());
   }
   deleteNetwork(id){        
    const url =  process.env.REACT_APP_BASE_URL_MINIGAME + "/mobile-card-vendor/delete/" + id;
    return fetch(url, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    }).then(res => res.json());
}

}
export default  NetworkService;