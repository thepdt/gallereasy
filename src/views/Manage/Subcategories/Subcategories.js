import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Input, Label } from 'reactstrap';
import PaginationComponent from "react-reactstrap-pagination";
import SubcategoryService from './SubcategoryService';
import './../style.css';
const Toolbars = React.lazy(() => import('../../../components/Toolbars/Toolbars'));

class Subcategories extends Component {
    _subcategoryService = new SubcategoryService();

    constructor(props) {
        super(props);

        this.state = {
            subcategories: [],
            checkedSubcategories: [],
            checkedAll: false,
            modal: false,
            createModalMode: Boolean,
            id: "",
            title: "",
            code: "",
            description: "",
            ParentId: ""
        };
        this.showSubcategoryDetail = this.showSubcategoryDetail.bind(this);

    }

    componentWillMount() {
        this.getSubcategories()
    }
    //get all Subcategories
    getSubcategories() {
        this._subcategoryService.getSubcategories()
            .then((result) => {
                if (result.StatusCode === 200 && result.Data !== null) {
                    result.Data.forEach(element => {
                        element.checked = false
                    });
                    this.setState({
                        subcategories: result.Data
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }
    closeModal() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    openCreateModal() {
        this.setState({
            modal: !this.state.modal,
            createModalMode: true,
            title: "",
            code: "",
            description: "",
            ParentId: ""
        });
    }

    createSubcategory() {
        const data = {
            Title: this.state.title,
            Code: this.state.code,
            Description: this.state.description
        }
        if (data.Title !== null && data.Code !== null && data.Description !== null) {
            this._categoryService.createCategory(data)
                .then((result) => {
                    result.Data.checked = false;
                    this.setState({
                        categories: this.state.categories.concat(result.Data)
                    })
                }).catch((err) => {
                    console.log("err: " + err);
                });

            this.setState({
                modal: !this.state.modal,
            });
        }
    }

    // Show detail category
    showSubcategoryDetail(id) {
        this.setState({
            modal: !this.state.modal,
        });
    }

    checkAll() {
        this.setState({
            checkedAll: !this.state.checkedAll,
        }, () => {
            const Subcategories = this.state.subcategories;

            if (this.state.checkedAll) {
                const _temp = [];
                Subcategories.forEach(element => {
                    element.checked = this.state.checkedAll;
                    _temp.push(element.Id)
                });
                this.setState({
                    checkedSubcategories: _temp
                });
            } else {
                Subcategories.forEach(element => {
                    element.checked = this.state.checkedAll;
                });
                this.setState({
                    checkedSubcategory: []
                });
            }
            this.setState({
                subcategories: Subcategories
            })
        });
    }

    checkOne(Id) {
        const Subcategories = this.state.subcategories;
        const checkedSubcategory = Subcategories.find(element => element.Id === Id);
        checkedSubcategory.checked = !checkedSubcategory.checked;
        if (checkedSubcategory.checked) {
            this.setState({
                checkedSubcategories: this.state.checkedSubcategories.concat([Id]),
                checkedAll: Subcategories.find(element => element.checked === false) === undefined
            });

        } else {
            const _temp = this.state.checkedSubcategories
            _temp.splice(this.state.checkedSubcategories.indexOf(Id), 1)
            this.setState({
                checkedSubcategories: _temp,
                checkedAll: false,
            });
        }
        this.setState({
            subcategories: Subcategories
        });
    }

    updateSubcategory() {
        console.log("update");
    }

    deleteSubcategory() {
        console.log("deleted");
    }

    searchSubcategory(e) {
        console.log(e);
    }

    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Toolbars
                            onDelete={e => this.deleteSubcategory(e)}
                            onShowDetail={e => this.showSubcategoryDetail(e)}
                            onSearch={e => this.searchSubcategory(e)}
                            searchPlaceholder1={'Tìm kiếm theo tên chuyên mục con'}
                            searchPlaceholder2={'Tìm kiếm theo mã chuyên mục con'} />
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Chuyên mục con
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
                                            <th scope="col">Tên chuyên mục con</th>
                                            <th scope="col">Mã chuyên mục con</th>
                                            <th scope="col">Mã chuyên mục cha</th>
                                            <th scope="col">Mô tả</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.subcategories.map((subcategory, index) =>
                                            (< tr key={subcategory.Id.toString()} >
                                                <td >
                                                    <label className="checkboxLabel">
                                                        <Input className="form-check-input" type="checkbox" id={subcategory.Id} name={subcategory.Id} value={subcategory.checked} checked={subcategory.checked} onChange={() => this.checkOne(subcategory.Id)} />
                                                        <span className="label-text"></span>
                                                    </label>
                                                </td>
                                                <td>{subcategory.Id}</td>
                                                <td>
                                                    <span className="title" onClick={() => this.showSubcategoryDetail(subcategory.Id)}>{subcategory.Title}</span>
                                                </td>
                                                <td>{subcategory.Code}</td>
                                                <td>{subcategory.ParentId}</td>
                                                <td>{subcategory.Description}</td>
                                            </tr>)
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.closeModal.bind(this)} className={'modal-lg ' + this.props.className}>
                    <ModalHeader toggle={this.closeModal.bind(this)}>Chuyên mục con</ModalHeader>
                    <ModalBody className="modal-body">
                        <FormGroup row>
                            <Col md="1">
                                <Label htmlFor="title-input">Tên chuyên mục con</Label>
                            </Col>
                            <Col xs="12" md="11">
                                <Input type="text" id="title-input" name="title-input" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="1">
                                <Label htmlFor="code-input">Mã chuyên mục con</Label>
                            </Col>
                            <Col xs="12" md="11">
                                <Input type="text" id="code-input" name="code-input" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="1">
                                <Label htmlFor="parent-input">Chuyên mục cha</Label>
                            </Col>
                            <Col xs="12" md="11">
                                <Input type="text" id="parent-input" name="parent-input" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="1">
                                <Label htmlFor="description-input">Miêu tả</Label>
                            </Col>
                            <Col xs="12" md="11">
                                <Input type="text" id="description-input" name="description-input" />
                            </Col>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateSubcategory}>Cập nhật</Button>{' '}
                        <Button color="secondary" onClick={this.showSubcategoryDetail}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Subcategories;