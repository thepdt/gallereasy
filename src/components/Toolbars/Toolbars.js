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
            <div>
                <Row style={{ marginBottom: 10 + 'px' }}>
                    <Col md="3">
                        <Button style={{ marginRight: 20 + 'px' }} color="primary" onClick={() => this.props.onShowDetail()}><i className="fa fa-plus"></i>&nbsp;Thêm mới</Button>
                        <Button color="danger" onClick={e => this.props.onDelete(e)}>Xóa</Button>
                    </Col>
                    <Col md="9">
                        <Row className="text-right">
                            <Col md="12">
                                <Button style={{ marginRight: 20 + 'px' }} color="primary" onClick={() => this.showSearchBox()}>Công cụ tìm kiếm&nbsp;<i className="fa fa-chevron-down"></i></Button>
                                <Button color="primary" onClick={() => this.clearSearchBox()}>Clear</Button>
                            </Col>
                        </Row >
                        {this.state.showSearchBox ?
                            <Row className="text-right searchbox">
                                <Col md="5" style={{ paddingRight: 0, paddingLeft: 0 }}>
                                    <Input type="text" id="searchByTitle-input" name="searchByTitle-input" placeholder={this.props.searchPlaceholder1} value={this.state.titleSearch} onChange={(e) => this.getTitle(e)}/>
                                </Col>
                                <Col md="5" style={{ paddingRight: 0, paddingLeft: 0 }}>
                                    <Input type="text" id="searchByStatus-input" name="searchByStatus-input" placeholder={this.props.searchPlaceholder2} value={this.state.statusSearch}  onChange={(e) => this.getStatus(e)}/>
                                </Col>
                                <Col md="2" style={{ paddingRight: 0, paddingLeft: 0 }}>
                                    <Button style={{ width: 100 + '%' }} color="info" onClick={() => this.props.onSearch(this.state.titleSearch)}><i className="fa fa-search"></i>&nbsp;Tìm kiếm</Button>
                                </Col>
                            </Row>
                        : null}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ToolBars;
