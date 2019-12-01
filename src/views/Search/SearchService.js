class SearchService {
    search = (key, offset) => {
        const url = process.env.REACT_APP_BASE_URL + "/gifs/search?api_key="+process.env.REACT_APP_GIPHY_KEY+"&q="+key+"&limit=8&offset="+offset+"&rating=G&lang=en"
        return fetch(url).then(res => res.json())
    }
}

export default SearchService;