import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node,
};
const defaultProps = {};

class DefaultHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSearchMode: false,
            currentPath : '/',
        };
    }

    componentDidMount() {
        let reg = new RegExp('#')
        this.setState({
            currentPath: window.location.hash.replace(reg, '') 
        })
    }

    componentDidUpdate() {
        let reg = new RegExp('#')
        if(this.state.currentPath !== window.location.hash.replace(reg, ''))
        this.setState({
            currentPath: window.location.hash.replace(reg, '') 
        })
    }
    toggleSearch() {
        this.setState({
            isSearchMode: !this.state.isSearchMode
        })
    }
    render() {
        // eslint-disable-next-line
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
               <div className="header row">
                    <div className="col-12 col-sm-3 logo">Galler<strong>easy</strong></div>
                    <div className="nav-bar col-12 col-sm-9">
                        <Link to="/" className={`link ${this.state.currentPath === '/'? 'active':''}`}>Search</Link>
                        <Link to="/favourites" className={`link ${this.state.currentPath === '/favourites'? 'active':''}`}>Favourites</Link>
                    </div>
               </div>
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;