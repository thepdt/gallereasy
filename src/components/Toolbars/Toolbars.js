import React, { Component } from 'react';
import { Input, Col, Row, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Select from "react-select";

class ToolBars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
            showSearchBox: false,
            searchOptionOpen: false,
            searchOption: 0,
            searchOptionValue: "Chế độ tìm kiếm"
        };

        this.searchOptionToggle = this.searchOptionToggle.bind(this);
        this.changeSearchOptionValue = this.changeSearchOptionValue.bind(this);
    }

    showSearchBox() {
        this.setState({
            showSearchBox: !this.state.showSearchBox
        }, () => {
            this.props.onShowSearchBox(this.state.showSearchBox)
        })
    }

    getSearchText = searchText => value => {
        if (value === null) {
            this.props.onClearSearchBox()
            this.setState({
                searchText: ""
            })
        } else {
            this.setState({
                [searchText]: value
            })
        }
    }

    searchOptionToggle() {
        this.setState({
            searchOptionOpen: !this.state.searchOptionOpen
        });
    }

    changeSearchOptionValue(event) {
        this.setState({
            searchText: "",
            searchOptionOpen: !this.state.searchOptionOpen,
            searchOptionValue: event.target.innerText,
            searchOption: Number(event.currentTarget.getAttribute("id"))
        });
    }

    getSearchTextOption2(event) {
        this.setState({
            searchText: event.target.value
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
                {this.state.showSearchBox &&
                    (<Row className="searchbox">
                        <div className="btn-group" role="group">

                            <ButtonDropdown isOpen={this.state.searchOptionOpen} toggle={this.searchOptionToggle}>
                                <DropdownToggle caret>{this.state.searchOptionValue}</DropdownToggle>
                                <DropdownMenu>
                                    {this.props.searchOptions.map(option =>
                                        <DropdownItem id={option.value} key={option.value} onClick={this.changeSearchOptionValue}>{option.text}</DropdownItem>
                                    )}
                                </DropdownMenu>
                            </ButtonDropdown>
                            {this.state.searchOption === 1 &&
                                <Select
                                    options={this.props.valueOptions.map(option => ({
                                        value: option.Id,
                                        label: option.Title
                                    }))}
                                    value={this.state.searchText}
                                    onChange={this.getSearchText("searchText")}
                                    placeholder={this.props.searchPlaceholder1}
                                    isClearable
                                />
                            }
                            {this.state.searchOption === 2 &&
                                <Input
                                    type="text"
                                    id="inputSearchOption_2"
                                    value={this.state.searchText}
                                    onChange={(e) => this.getSearchTextOption2(e)}
                                    placeholder={this.props.searchPlaceholder2}
                                />
                            }
                            <Button color="primary" onClick={() => this.props.onSearch(this.state.searchOption, this.state.searchText)} disabled={this.state.searchText === ""}><i className="fa fa-search"></i>&nbsp;Tìm kiếm</Button>
                        </div>
                    </Row>)
                }
            </div>
        )
    }
}

export default ToolBars;
