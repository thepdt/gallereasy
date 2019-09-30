class CardphoneService {
    getCardphone =(pageIndex,pageName, pageValue,pageStatus )=>{       
        const url = process.env.REACT_APP_BASE_URL_MINIGAME + "/mobile-card/list?pageSize=10&pageIndex=" + pageIndex + "&Name=" + pageName +"&Value="+ pageValue +"&Status="+ pageStatus  
        return fetch(url).then(res => res.json());
    }
    // getSearchCardphone=(pageIndex,pageName,pageValue,pageStatus )=>{       
    //     const url = process.env.REACT_APP_BASE_URL_MINIGAME + "/mobile-card/list?pageSize=10&pageIndex=" + pageIndex + "&Name=" + pageName +"&Value="+ pageValue +"&Status="+ pageStatus  
    //     return fetch(url).then(res => res.json());
    // }
    getVendorCodes=()=>{
        const url = process.env.REACT_APP_BASE_URL_MINIGAME + "/mini-game/exchange-mobile-card/list/vendor"
        return fetch(url).then(res => res.json());
    }
    createCardphone(cardphone){        
        const url = process.env.REACT_APP_BASE_URL_MINIGAME  + "/mobile-card/add" 
        return fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(cardphone)
        }).then(res => res.json());

   }
   updateCardphone(cardphone){       
    const url =  process.env.REACT_APP_BASE_URL_MINIGAME + "/mobile-card/update"
    return fetch(url, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(cardphone)
    }).then(res => res.json());
   }
    deleteCardphone(id){        
        const url =  process.env.REACT_APP_BASE_URL_MINIGAME + "/mobile-card/delete/" + id;
        return fetch(url, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        }).then(res => res.json());
    }
   
}
export default  CardphoneService;