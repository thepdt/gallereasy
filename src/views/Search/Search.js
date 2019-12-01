import React, { Component } from 'react';
import SearchService from './SearchService';
import BackToTop from '../../components/BackToTop/BackToTop'
import Notifications from '../../components/Notifications'
import AwesomeDebouncePromise from 'awesome-debounce-promise';

class Search extends Component {
    _searchService = new SearchService();

    constructor(props) {
        super(props);

        this.state = {
           searchKey: '',
           searchResult: [],
           offset: 0,
           minRatioHW: 10,
           itemCardHeight: 0,
           itemCardWidth: 0,
           isSearching: false,
           isSearchingMore: false,
           myFavourites: [],
        };
        this.delayedCallback = AwesomeDebouncePromise(this.search.bind(this), 500);
    }

    componentDidMount() {
        this.listenToResize()
        window.addEventListener('resize', this.listenToResize)
        const myFavourites = localStorage.getItem('MyFavourites')
        if(myFavourites !== null && myFavourites.length > 0) {
            this.setState({
                myFavourites: myFavourites.split(',')
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.listenToResize)
    }

    listenToResize = () => {
        const w = document.documentElement.clientWidth;
        let itemCardWidth = 0
        switch (true) {
            case (w>1439):
                itemCardWidth = w/6 - 6*8
                break;
        
            case (w>1023):
                itemCardWidth = w/4 - 4*8
                break;
            case (w>599):
                itemCardWidth = w/3 - 3*8
                break;
            default:
                itemCardWidth = w/2 - 2*8
                break;
        }
        this.setState({
            itemCardWidth: itemCardWidth,
            itemCardHeight: itemCardWidth*this.state.minRatioHW
        })
    }

    handleChangeKey(event) {
        this.setState({
            searchKey: event.target.value,
            searchResult: [],
            offset: 0,
            isSearching: true, 
            isSearchingMore: false
        }, () =>{
            if(this.state.searchKey === ''){
                this.setState({isSearching: false})
            } else {
                this.delayedCallback(this.state.searchKey, 0)
            }
        })
    }

    search(key, offset) {
        this._searchService.search(key, offset)
        .then((result) => {
            if(result.meta.status === 200) {
                if(result.pagination.count > 0) {
                    result.data.forEach(element => {
                        let ratio=Number(element.images.downsized.height)/Number(element.images.downsized.width)
                        if (ratio < this.state.minRatioHW) {
                            this.setState({
                                minRatioHW: ratio,
                                itemCardHeight: this.state.itemCardWidth*ratio
                            })
                        }
                    })
                    if (this.state.offset === 0) {
                        this.setState({
                            searchResult: [...result.data],
                            offset: this.state.offset + 8
                        })
                    } else {
                        this.setState({
                            searchResult: [...this.state.searchResult, ...result.data],
                            offset: this.state.offset + 8
                        })
                    }
                } else {
                    this.addNoti.addNotification("danger", "Your search did not match any documents!");
                }
                this.setState({
                    isSearching: false,
                    isSearchingMore: false
                })
            } else {
                this.addNoti.addNotification("danger", "Opp...Error!");
            }
        }).catch((err) => {
            this.addNoti.addNotification("danger", "Opp...Error!");
            console.log("error: " + err);
        });
    }

    fetchMore() {
        this.setState({isSearchingMore: true}, () => {
            this.search(this.state.searchKey, this.state.offset)
        })
    }

    getBtnFetchMore(){
        switch (true) {
            case (this.state.isSearchingMore):
                return <div className="spinner-border d-block" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
            case (this.state.offset === 0): 
                return null
            default: 
                return <button type="button" className="btn btn-link d-block fetch-more-btn" onClick={() => this.fetchMore()}>Fetch More...</button>
            
        }
    }

    handleSelectFavorite(id) {
        if(this.state.myFavourites.includes(id)) {
            this.setState({
                myFavourites: this.state.myFavourites.filter(e => e !== id)
            },()=>{
                localStorage.setItem('MyFavourites', this.state.myFavourites);
            })
        } else {
            this.setState({
                myFavourites: [...this.state.myFavourites, id]
            },()=>{
                localStorage.setItem('MyFavourites', this.state.myFavourites);
            })
        }
    }

    render() {
        return (
            <div className="search-component">
                <Notifications onAddNoti={e => this.addNoti = e}></Notifications>
                <div className="search-input">
                    <input autoFocus type="text" placeholder="Start searching for images!" value={this.state.value} onChange={(e) => this.handleChangeKey(e)} />
                </div>
                {this.state.isSearching?
                    <div className="spinner-border d-block" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    <div className="search-result row">
                        {
                            this.state.searchResult.map((img, index) =>(
                                <div key={img.id} className="item-card" style={{ height: this.state.itemCardHeight + "px", width: this.state.itemCardWidth+"px" }}>
                                    <i className={`fa fa-heart ${this.state.myFavourites.includes(img.id) ? 'favouriteItem':''}`} onClick={()=>this.handleSelectFavorite(img.id)}></i>
                                    <img src={img.images.downsized.url} alt={img.title} />
                                </div>
                            ))
                        }
                    </div>
                }
                {this.getBtnFetchMore()}
                <BackToTop />
            </div>
        )
    }
}

export default Search;