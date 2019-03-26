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
            categories: [],
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
        this._categoryService.getCategories()
        .then((result) => {
            result.forEach(element => {
                element.checked = false
            });
            this.setState({
                categories: result
            })
        }).catch((err) => {
            console.log("error: " + err);
        });
    }

    //Close modal 
    closeModal() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    //Add a new category
    createCategory() {
        this.setState({
            modal: !this.state.modal,
            title: "",
            code: "",
            description: ""
        });
    }

    // Show detail category
    showCategoryDetail(id) {
        const categorySelected = this.state.categories.find(element => element.Id === id)
        this.setState({
            modal: !this.state.modal,
            title: categorySelected.Title,
            code: categorySelected.Code,
            description: categorySelected.Description
        });
    }

    updateCategory() {
        const data = {
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

    deleteCategory() {
        console.log("deleted");
    }

    searchCategory(e) {
        console.log(e);
    }

    getId(event) {
        this.setState({
            id: event.target.value
        })
    }

    getTitle(event) {
        this.setState({
            title: event.target.value
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
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Toolbars
                            onDelete={e => this.deleteCategory(e)}
                            onCreate={e => this.createCategory(e)}
                            onSearch={e => this.searchCategory(e)}
                            searchPlaceholder1={'Tìm kiếm theo tên chuyên mục'}
                            searchPlaceholder2={'Tìm kiếm theo mã chuyên mục '} />
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Chuyên mục
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover bordered striped>
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{ width: 25 + 'px' }}>
                                                <label className="checkboxLabel">
                                                    <Input className="form-check-input" type="checkbox" checked={this.state.checkedAll} onChange={() => this.checkAll()} />
                                                    <span className="label-text"></span>
                                                </label>
                                            </th>
                                            <th scope="col">Id</th>
                                            <th scope="col">Tên chuyên mục</th>
                                            <th scope="col">Mã chuyên mục</th>
                                            <th scope="col">Mô tả</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.categories.map((category, index) =>
                                            (< tr key={category.Id.toString()} >
                                                <td >
                                                    <label className="checkboxLabel">
                                                        <Input className="form-check-input" type="checkbox" id={category.Id} name={category.Id} value={category.checked} checked={category.checked} onChange={() => this.checkOne(category.Id)} />
                                                        <span className="label-text"></span>
                                                    </label>
                                                </td>
                                                <td>{category.Id}</td>
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
                    <ModalHeader toggle={this.closeModal.bind(this)}>Chuyên mục</ModalHeader>
                    <ModalBody className="modal-body">
                        <FormGroup row>
                            <Col md="1">
                                <Label htmlFor="title-input">Tên chuyên mục</Label>
                            </Col>
                            <Col xs="12" md="11">
                                <Input type="text" id="title-input" name="title-input" value={this.state.title} onChange={(e) => this.getTitle(e)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="1">
                                <Label htmlFor="code-input">Mã chuyên mục</Label>
                            </Col>
                            <Col xs="12" md="11">
                                <Input type="text" id="code-input" name="code-input" value={this.state.code} onChange={(e) => this.getCode(e)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="1">
                                <Label htmlFor="description-input">Miêu tả</Label>
                            </Col>
                            <Col xs="12" md="11">
                                <Input type="text" id="description-input" name="description-input" value={this.state.description} onChange={(e) => this.getDescription(e)} />
                            </Col>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateCategory.bind(this)}>Cập nhật</Button>{' '}
                        <Button color="secondary" onClick={this.closeModal.bind(this)}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Categories;