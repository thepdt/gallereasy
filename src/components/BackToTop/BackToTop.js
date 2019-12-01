import React, { Component } from 'react';

class BackToTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0,
            isShown: false 
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }

    listenToScroll = () => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop
        this.setState({isShown: winScroll > 250 }) 
    }

    scrollToTop = () => {
        this.setState({intervalId: setInterval(this.scrollStep.bind(this), 5)})
    }

    scrollStep = () => {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - 500);
    }

    render() {
        return (
            <div className={`backToTopBox ${this.state.isShown ? '':'d-none'}`} onClick={() => this.scrollToTop()}>
                <i className="fa fa-arrow-up"></i>
            </div>
        );
    }
}

export default BackToTop;
