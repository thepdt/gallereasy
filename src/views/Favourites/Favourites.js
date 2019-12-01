import React, { Component } from 'react';
import FavouritesService from './FavouritesService';
import BackToTop from '../../components/BackToTop/BackToTop'
import Notifications from '../../components/Notifications'

class Favourites extends Component {
    _favouritesService = new FavouritesService();

    constructor(props) {
        super(props);

        this.state = {
           searchResult: [],
           minRatioHW: 10,
           itemCardHeight: 0,
           itemCardWidth: 0,
           isSearching: false,
           myFavourites: [],
        };
    }

    componentDidMount() {
        this.listenToResize()
        window.addEventListener('resize', this.listenToResize)
        const myFavourites = localStorage.getItem('MyFavourites')
        if(myFavourites !== null && myFavourites.length > 0) {
            this.setState({
                myFavourites: myFavourites.split(','),
                isSearching: true
            }, () => {
                this.getFavourites(this.state.myFavourites)
            })
        } else {

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

    getFavourites(ids) {
        this._favouritesService.getByIDs(ids.join())
        .then((result) => {
            if(result.meta.status === 200) {
                result.data.forEach(element => {
                    let ratio=Number(element.images.downsized.height)/Number(element.images.downsized.width)
                    if (ratio < this.state.minRatioHW) {
                        this.setState({
                            minRatioHW: ratio,
                            itemCardHeight: this.state.itemCardWidth*ratio
                        })
                    }
                })
                this.setState({
                    searchResult: [...result.data],
                    isSearching: false
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
        this.setState({
            myFavourites: this.state.myFavourites.filter(e => e !== id),
            searchResult: this.state.searchResult.filter(e => e.id !== id)
        },()=>{
            localStorage.setItem('MyFavourites', this.state.myFavourites);
        })
        
    }

    render() {
        return (
            <div className="search-component">
                <Notifications onAddNoti={e => this.addNoti = e}></Notifications>
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
                {this.state.searchResult.length === 0?
                    <h1 className="empty-page">Empty!!!</h1>
                    :null
                }
                <BackToTop />
            </div>
        )
    }
}

export default Favourites;