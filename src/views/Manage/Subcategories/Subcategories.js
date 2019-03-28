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
            selectedPage: 1,
            modal: false,
            createModalMode: Boolean,
            id: "",
            title: "",
            code: "",
            description: "",
            parentId: "",
            ordinal: "",
            parentCategories: []
        };
        this.showSubcategoryDetail = this.showSubcategoryDetail.bind(this);

    }

    componentWillMount() {
        this.getParentCategories()
    }

    getParentCategories() {
        this._subcategoryService.getParentCategories()
            .then((result) => {
                if (result.StatusCode === 200 && result.Data !== null) {
                    this.setState({
                        parentCategories: result.Data
                    }, () => {
                        this.getSubcategories();
                    })
                }
            }).catch((err) => {
                console.log(err);
            });
    }
    //get all Subcategories
    getSubcategories() {
        this._subcategoryService.getSubcategories()
            .then((result) => {
                if (result.StatusCode === 200 && result.Data !== null) {
                    result.Data.forEach(element => {
                        element.checked = false
                        element.parentCategory = this.state.parentCategories.find(el => el.Id === element.ParentId).Title
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
            parentId: "",
            ordinal: ""
        });
    }

    createSubcategory() {
        const data = {
            Title: this.state.title,
            Code: this.state.code,
            Description: this.state.description,
            ParentId: this.state.parentId,
            Ordinal: Number(this.state.ordinal)
        }
        if (data.Title !== null && data.Code !== null && data.Description !== null && data.ParentId !== null) {
            this._subcategoryService.createSubcategory(data)
                .then((result) => {
                    console.log(result);
                    if (result.StatusCode === 200 && result.Data !== null) {
                        result.Data.checked = false;
                        result.Data.parentCategory = this.state.parentCategories.find(el => el.Id === result.Data.ParentId).Title

                        this.setState({
                            subcategories: this.state.subcategories.concat(result.Data)
                        })
                    }
                }).catch((err) => {
                    console.log("err: " + err);
                });

            this.setState({
                modal: !this.state.modal,
            });
        }
    }

    // Show detail subcategory
    showSubcategoryDetail(id) {
        const subcategorySelected = this.state.subcategories.find(element => element.Id === id)
        this.setState({
            modal: !this.state.modal,
            createModalMode: false,
            id: subcategorySelected.Id,
            title: subcategorySelected.Title,
            code: subcategorySelected.Code,
            description: subcategorySelected.Description,
            parentId: subcategorySelected.ParentId,
            ordinal: subcategorySelected.Ordinal
        });
    }

    updateSubcategory() {
        const data = {
            Id: this.state.id,
            Title: this.state.title,
            Code: this.state.code,
            Description: this.state.description,
            ParentId: this.state.parentId,
            Ordinal: Number(this.state.ordinal)
        }
        this._subcategoryService.updateSubcategory(data)
            .then((result) => {
                result.Data.checked = false;
                result.Data.parentCategory = this.state.parentCategories.find(el => el.Id === result.Data.ParentId).Title
                const _subcategories = this.state.subcategories
                const index = _subcategories.findIndex(el => el.Id === result.Data.Id)
                _subcategories[index] = result.Data

                this.setState({
                    subcategories: _subcategories
                })
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

    checkMulti(Id) {
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

    checkOne(Id) {
        const Subcategories = this.state.subcategories;
        const index = Subcategories.findIndex(element => element.Id === Id);
        for (var i = 0; i < Subcategories.length; i++) {
            if (i !== index) {
                Subcategories[i].checked = false
            } else {
                Subcategories[index].checked = !Subcategories[index].checked
            }
        }
        if (Subcategories[index].checked) {
            this.setState({
                checkedSubcategories: [Id],
            });
        } else {
            this.setState({
                checkedSubcategories: [],
            });
        }
        this.setState({
            subcategories: Subcategories
        });
    }

    deleteSubcategory() {
        if (this.state.checkedSubcategories.length !== 0) {
            this._subcategoryService.deleteSubcategory(this.state.checkedSubcategories[0])
                .then((result) => {
                    if (result.StatusCode === 200) {
                        const _subcategories = this.state.subcategories
                        const index = _subcategories.findIndex(el => el.Id === this.state.checkedSubcategories[0])
                        _subcategories.splice(index, 1);
                        this.setState({
                            subcategories: _subcategories
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    searchSubcategory(e) {
        console.log(e);
    }

    searchCategory(e) {
        console.log(e);
    }

    getId(event) {
        this.setState({
            id: event.target.value
        })
    }

    getOrdinal(event) {
        this.setState({
            ordinal: event.target.value
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

    getParentId(event) {
        this.setState({
            parentId: event.target.value
        })
    }

    selectePage(selectedPage) {
        this.setState({ selectedPage: selectedPage });
    }

    render() {

        return (
            <div className="container-fullwidth">
                <Toolbars
                    onDelete={e => this.deleteSubcategory(e)}
                    onOpenCreateModal={e => this.openCreateModal(e)}
                    onSearch={e => this.searchSubcategory(e)}
                    searchPlaceholder1={'Tìm kiếm theo tên chuyên mục con'} />
                <div className="animated fadeIn">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Chuyên mục con
                            </CardHeader>
                                <CardBody>
                                    <Table responsive hover bordered striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" width="3%" className="centered">
                                                    <label className="checkboxLabel">#
                                                        {/* <Input className="form-check-input" type="checkbox" checked={this.state.checkedAll} onChange={() => this.checkAll()} /> */}
                                                        <span className="label-text"></span>
                                                    </label>
                                                </th>
                                                <th scope="col" width="7%" className="centered">Độ ưu tiên</th>
                                                <th scope="col" width="25%" className="centered">Tên chuyên mục con</th>
                                                <th scope="col" width="15%" className="centered">Mã chuyên mục con</th>
                                                <th scope="col" width="15%" className="centered">Chuyên mục cha</th>
                                                <th scope="col" width="35%" className="centered">Mô tả</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.subcategories.map((subcategory, index) =>
                                                (< tr key={subcategory.Id.toString()} >
                                                    <td className="centered">
                                                        <label className="checkboxLabel">
                                                            <Input className="form-check-input" type="checkbox" id={subcategory.Id} name={subcategory.Id} value={subcategory.checked} checked={subcategory.checked} onChange={() => this.checkOne(subcategory.Id)} />
                                                            <span className="label-text"></span>
                                                        </label>
                                                    </td>
                                                    <td>{subcategory.Ordinal}</td>
                                                    <td>
                                                        <span className="title" onClick={() => this.showSubcategoryDetail(subcategory.Id)}>{subcategory.Title}</span>
                                                    </td>
                                                    <td>{subcategory.Code}</td>
                                                    <td>{subcategory.parentCategory}</td>
                                                    <td>{subcategory.Description}</td>
                                                </tr>)
                                            )}
                                        </tbody>
                                    </Table>
                                    <PaginationComponent totalItems={10000} pageSize={10} onSelect={this.selectePage.bind(this)} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.closeModal.bind(this)} className={'modal-lg ' + this.props.className}>
                        <ModalHeader toggle={this.closeModal.bind(this)}>Chuyên mục con</ModalHeader>
                        <ModalBody className="modal-body">
                            <FormGroup row>
                                <Col md="4">
                                    <Label htmlFor="title-input" className="title-required">Tên chuyên mục con:</Label>
                                </Col>
                                <Col xs="12" md="8">
                                    <Input type="text" id="title-input" name="title-input" value={this.state.title} onChange={(e) => this.getTitle(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4">
                                    <Label htmlFor="code-input" className="title-required">Mã chuyên mục con:</Label>
                                </Col>
                                <Col xs="12" md="8">
                                    <Input type="text" id="code-input" name="code-input" value={this.state.code} onChange={(e) => this.getCode(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4">
                                    <Label htmlFor="ordinal-input" className="title-required">Độ ưu tiên:</Label>
                                </Col>
                                <Col xs="12" md="8">
                                    <Input type="number" id="ordinal-input" name="ordinal-input" value={this.state.ordinal} onChange={(e) => this.getOrdinal(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4">
                                    <Label htmlFor="parent-input" className="title-required">Chuyên mục cha:</Label>
                                </Col>
                                <Col xs="12" md="8">
                                    <Input type="select" id="parent-input" name="parentId-input" value={this.state.parentId} onChange={(e) => this.getParentId(e)}>
                                        <option key='0' value='0'>--Chọn chuyên mục cha--</option>
                                        {this.state.parentCategories.map((parentCategory, index) =>
                                            (
                                                <option key={parentCategory.Id} value={parentCategory.Id}>{parentCategory.Title}</option>
                                            )
                                        )}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4">
                                    <Label htmlFor="description-input" >Miêu tả:</Label>
                                </Col>
                                <Col xs="12" md="8">
                                    <Input type="text" id="description-input" name="description-input" value={this.state.description} onChange={(e) => this.getDescription(e)} />
                                </Col>
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            {this.state.createModalMode ?
                                <Button color="primary" onClick={this.createSubcategory.bind(this)}>Thêm mới</Button>
                                :
                                <Button color="primary" onClick={this.updateSubcategory.bind(this)}>Cập nhật</Button>
                            }
                            <Button color="secondary" onClick={this.closeModal.bind(this)}>Hủy</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Subcategories;