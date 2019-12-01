class FavouritesService {
    getByIDs = (Ids) => {
        const url = process.env.REACT_APP_BASE_URL + "/gifs?api_key="+process.env.REACT_APP_GIPHY_KEY+"&ids="+Ids
        return fetch(url).then(res => res.json())
    }
}

export default FavouritesService;