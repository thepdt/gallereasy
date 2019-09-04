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
            searchOptionValue: "Chế độ tìm kiếm",
            searchNameText: "",
            searchValueText:"",
            searchStatusText:""
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

    getSearchName(event){
        this.setState({
            searchNameText: event.target.value
        })
    }

    getSearchValue(event){
        this.setState({
            searchValueText: event.target.value
        })
    }

    getSearchStatus(event){
        this.setState({
            searchStatusText: event.target.value
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
                <Row>
                    {this.state.showSearchBox &&
                        (   
                            <Row className = "searchbox">
                                <div className ="btn-group" role="group"> 
                                    <div className ="col-3">
                                        <div className = "input-group"> 
                                            <span className ="input-group-text">Name</span>          
                                            <Input type ="text" id ="search-name" onChange = {(e) => this.getSearchName(e)}  placeholder = {this.props.searchName}></Input> 
                                        </div>
                                       
                                    </div>
                                    <div className = "col-3">
                                        <div className = "input-group">
                                            <span className = "input-group-text">Value</span>
                                            <Input type ="text" id ="search-value" onChange ={(e) =>this.getSearchValue(e)} placeholder ={this.props.searchValue}></Input>
                                        </div>
                                        
                                    </div>
                                    <div className ="col-3">
                                        <div className = "input-group">
                                            <span className ="input-group-text">Status</span>
                                            <Input type="text" id="search-status" onChange ={(e)=>this.getSearchStatus(e)} placeholder ={this.props.searchStatus}></Input>
                                        </div>                                        
                                    </div>
                            
                                </div>
                                <Button color ="primary" onClick ={()=>this.props.onSearch(this.state.searchNameText,this.state.searchValueText,this.state.searchStatusText)} ><i className="fa fa-search"></i>&nbsp;Tìm kiếm</Button>
                            </Row>
                        )
                    }
                </Row>
            </div>
        )
    }
}

export default ToolBars;
