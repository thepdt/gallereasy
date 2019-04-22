import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import Select from "react-select";

class ToolBars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
            showSearchBox: false,
        };
    }

    showSearchBox() {
        this.props.onShowSearchBox()
        this.setState({
            showSearchBox: !this.state.showSearchBox
        })
    }

    getSearchText = searchText => value => {
        console.log(value);
        if(value === null) {
            this.props.onClearSearchBox()
        }
        this.setState({
            [searchText]: value
        })
    }

    render() {
        return (
            <div className="toolbar">
                <Row>
                    <Col md="3">
                        <div className="btn-group" role="group">
                            <Button color="success" onClick={() => this.props.onOpenCreateModal()}><i className="fa fa-plus"></i>&nbsp;Thêm mới</Button>
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
                    <Row className="searchbox">
                        <Select
                            options={this.props.publishers.map(publisher => ({
                                value: publisher.Id,
                                label: publisher.Title
                            }))}
                            value={this.state.searchText}
                            onChange={this.getSearchText("searchText")}
                            placeholder={this.props.searchPlaceholder}
                            isClearable
                        />
                        <Button color="primary" onClick={() => this.props.onSearch(this.state.searchText)} disabled={this.state.searchText ===""}><i className="fa fa-search"></i>&nbsp;Tìm kiếm</Button>
                    </Row>
                    : null}
            </div>
        )
    }
}

export default ToolBars;
