import React, { Component } from 'react';
import { Col, Row, Button, Input } from 'reactstrap';

class ToolBars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titleSearch: "",
            statusSearch: "",
            showSearchBox: false,
        };
    }

    showSearchBox() {
        this.setState({
            showSearchBox: !this.state.showSearchBox
        })
    }

    clearSearchBox() {
        this.setState({
            titleSearch: "",
            statusSearch: ""
        })
    }
    
    getTitle(event){
        this.setState({
            titleSearch: event.target.value
        })
    }

    getStatus(event){
        this.setState({
            statusSearch: event.target.value
        })
    }

    render() {
        return (
            <div className="toolbar">
                <Row>
                    <Col md="3">
                        <div className="btn-group" role="group">
                            <Button color="success" onClick={() => this.props.onShowDetail()}><i className="fa fa-plus"></i>&nbsp;Thêm mới</Button>
                            <Button color="danger" onClick={e => this.props.onDelete(e)}><i className="fa fa-trash"></i>&nbsp;Xóa</Button>
                        </div>
                    </Col>
                    <Col md="9">
                        <Row className="text-right">
                            <Col md="12">
                                <Button color="primary" onClick={() => this.showSearchBox()}>Công cụ tìm kiếm&nbsp;<i className="fa fa-chevron-down"></i></Button>
                            </Col>
                        </Row >
                    </Col>
                </Row>
                {this.state.showSearchBox ?
                    <Row className="text-right searchbox">                        
                        <div className="input-group">
                            <Input type="text" id="searchByTitle-input" name="searchByTitle-input" placeholder={this.props.searchPlaceholder1} value={this.state.titleSearch} onChange={(e) => this.getTitle(e)}/>
                            <div className="input-group-append">
                                <Button color="primary" onClick={() => this.props.onSearch(this.state.titleSearch)}><i className="fa fa-search"></i>&nbsp;Tìm kiếm</Button>
                                <Button color="danger" onClick={() => this.props.onSearch(this.state.titleSearch)}><i className="fa fa-eraser"></i>&nbsp;Xóa</Button>
                            </div>
                        </div>
                    </Row>
                : null}
            </div>
        )
    }
}

export default ToolBars;
