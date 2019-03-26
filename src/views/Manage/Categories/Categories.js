import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Input, Label } from 'reactstrap';
import CategoryService from './CategoryService';
import './../style.css';
const Toolbars = React.lazy(() => import('./../../../components/Toolbars'));

class Categories extends Component {
    _categoryService = new CategoryService();

    constructor(props) {
        super(props);

        this.state = {
            categories: this._categoryService.List(),
            checkedCategories: [],
            checkedAll: false,
            modal: false,
            title: "",
            code: "",
            description: "",
        };
        this.showCategoryDetail = this.showCategoryDetail.bind(this);

    }

    componentWillMount() {
        this._categoryService.getItems()
    }

    // Show detail category
    showCategoryDetail(id) {
        this.setState({
            modal: !this.state.modal,
        });
    }

    checkAll() {
        this.setState({
            checkedAll: !this.state.checkedAll,
        }, () => {
            const Categories = this.state.categories;

            if (this.state.checkedAll) {
                const _temp = [];
                Categories.forEach(element => {
                    element.checked = this.state.checkedAll;
                    _temp.push(element.Id)
                });
                this.setState({
                    checkedCategories: _temp
                });
            } else {
                Categories.forEach(element => {
                    element.checked = this.state.checkedAll;
                });
                this.setState({
                    checkedCategory: []
                });
            }
            this.setState({
                categories: Categories
            })
        });
    }

    checkOne(Id) {
        const Categories = this.state.categories;
        const checkedCategory = Categories.find(element => element.Id === Id);
        checkedCategory.checked = !checkedCategory.checked;
        if (checkedCategory.checked) {
            this.setState({
                checkedCategories: this.state.checkedCategories.concat([Id]),
                checkedAll: Categories.find(element => element.checked === false) === undefined
            });
            // if (Categories.find(element => element.checked === false) === undefined) {
            //     this.setState({ checkedAll: true })
            // } else {
            //     this.setState({ checkedAll: false })
            // }
        } else {
            const _temp = this.state.checkedCategories
            _temp.splice(this.state.checkedCategories.indexOf(Id), 1)
            this.setState({
                checkedCategories: _temp,
                checkedAll: false,
            });
        }
        this.setState({
            categories: Categories
        });
    }

    updateCategory() {
        console.log("update");
        console.log("1: " + this.state.title);
        console.log("2: " + this.state.code);
        console.log("3: " + this.state.description);
        const data = {
            Id: 111,
            Code: this.state.title,
            Title: this.state.code,
            Description: this.state.description
        }

        this._categoryService.updateCategory(data)
        .then((result) => {
            console.log(result);            
        }).catch((err) => {
            console.log("error: " + err);            
        });

        this.setState({
            modal: !this.state.modal,
        });
    }

    deleteCategory() {
        console.log("deleted");
    }

    searchCategory(e) {
        console.log(e);
    }

    getTitle(event) {
        this.setState({
            title: event.target.value
        }, () => {
            console.log("1111: " + this.state.title);
        })
    }

    getCode(event) {
        this.setState({
            code: event.target.value
        })
    }

    getDescription(event) {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        return (
            <div className="container-fullwidth">
                <Toolbars className="toolbar"
                    onDelete={e => this.deleteCategory(e)}
                    onShowDetail={e => this.showCategoryDetail(e)}
                    onSearch={e => this.searchCategory(e)}
                    searchPlaceholder1={'Tìm kiếm theo tên chuyên mục'} />
                <div className="animated fadeIn">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Chuyên mục
                                </CardHeader>
                                <CardBody>
                                    <Table responsive hover bordered striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" width="3%" className="centered">
                                                    <label className="checkboxLabel">
                                                        <Input className="form-check-input" type="checkbox" checked={this.state.checkedAll} onChange={() => this.checkAll()} />
                                                        <span className="label-text"></span>
                                                    </label>
                                                </th>
                                                <th scope="col" width="47%" className="centered">Tên chuyên mục</th>
                                                <th scope="col" width="10%" className="centered">Mã chuyên mục</th>
                                                <th scope="col" width="40%" className="centered">Mô tả</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.categories.map((category, index) =>
                                                (< tr key={category.Id.toString()} >
                                                    <td className="centered">
                                                        <label className="checkboxLabel">
                                                            <Input className="form-check-input" type="checkbox" id={category.Id} name={category.Id} value={category.checked} checked={category.checked} onChange={() => this.checkOne(category.Id)} />
                                                            <span className="label-text"></span>
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <span className="title" onClick={() => this.showCategoryDetail(category.Id)}>{category.Title}</span>
                                                    </td>
                                                    <td>{category.Code}</td>
                                                    <td>{category.Description}</td>
                                                </tr>)
                                            )}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.showCategoryDetail} className={'modal-lg ' + this.props.className}>
                        <ModalHeader toggle={this.showCategoryDetail}>Chuyên mục</ModalHeader>
                        <ModalBody className="modal-body">
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="title-input" className="title-required">Tên chuyên mục:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="text" id="title-input" name="title-input" value={this.state.title} onChange={(e) => this.getTitle(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="code-input" className="title-required">Mã chuyên mục:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="text" id="code-input" name="code-input" value={this.state.code} onChange={(e) => this.getCode(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="description-input">Miêu tả:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="text" id="description-input" name="description-input" value={this.state.description} onChange={(e) => this.getDescription(e)} />
                                </Col>
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.updateCategory.bind(this)}>Cập nhật</Button>{' '}
                            <Button color="secondary" onClick={this.showCategoryDetail}>Hủy</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Categories;