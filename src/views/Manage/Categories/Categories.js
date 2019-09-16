import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, FormFeedback, Input, Label } from 'reactstrap';
import PaginationComponent from "react-reactstrap-pagination";
import CategoryService from './CategoryService';
const Toolbars = React.lazy(() => import('./../../../components/Toolbars'));

class Categories extends Component {
    _categoryService = new CategoryService();

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            checkedCategories: [],
            checkedAll: false,
            selectedPage: 1,
            modal: false,
            createModalMode: Boolean,
            id: "",
            title: "",
            code: "",
            description: "",
            ordinal: "",
            postByCategorys: [],
            categoryByCode: "",
            lastedId:""
        };
        this.showCategoryDetail = this.showCategoryDetail.bind(this);

    }

    componentWillMount() {
        this.getCategories()
    }

    //get all categories
    getCategories() {
        this._categoryService.getCategories()
            .then((result) => {
                if (result.Message === "Success") {
                    result.Data.forEach(element => {
                        element.checked = false
                    });
                    this.setState({
                        categories: result.Data
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }

    //get all categories
    getCategoryById(id) {
        this._categoryService.getCategoryById(id)
            .then((result) => {
                if (result.Message === "Success") {
                    const element = result.Data
                    element.checked = false
                    this.setState({
                        categories: [element]
                    })
                }
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
    openCreateModal() {
        this.setState({
            modal: !this.state.modal,
            createModalMode: true,
            title: "",
            code: "",
            description: "",
            ordinal: ""
        });
    }

    createCategory() {
        const data = {
            Title: this.state.title,
            Code: this.state.code,
            Description: this.state.description,
            Ordinal: Number(this.state.ordinal)
        }

        this._categoryService.createCategory(data)
            .then((result) => {
                if (result.Message === "Success") {
                    this.getCategories()
                }
            }).catch((err) => {
                console.log("err: " + err);
            });

        this.setState({
            modal: !this.state.modal,
        });

    }

    // Show detail category
    showCategoryDetail(id) {
        const categorySelected = this.state.categories.find(element => element.Id === id)
        this.setState({
            modal: !this.state.modal,
            createModalMode: false,
            id: categorySelected.Id,
            title: categorySelected.Title,
            code: categorySelected.Code,
            description: categorySelected.Description,
            ordinal: categorySelected.Ordinal
        });
    }

    updateCategory() {
        const data = {
            Id: this.state.id,
            Title: this.state.title,
            Code: this.state.code,
            Description: this.state.description,
            Ordinal: Number(this.state.ordinal)
        }

        this._categoryService.updateCategory(data)
            .then((result) => {
                if (result.Message === "Success") {
                    this.getCategories()
                }
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

    checkMulti(Id) {
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

    checkOne(Id) {
        const Categories = this.state.categories;
        const index = Categories.findIndex(element => element.Id === Id);
        for (var i = 0; i < Categories.length; i++) {
            if (i !== index) {
                Categories[i].checked = false
            } else {
                Categories[index].checked = !Categories[index].checked
            }
        }
        if (Categories[index].checked) {
            this.setState({
                checkedCategories: [Id],
            });
        } else {
            this.setState({
                checkedCategories: [],
            });
        }
        this.setState({
            categories: Categories
        });
    }

    deleteCategory() {
        if (this.state.checkedCategories.length !== 0) {
            this._categoryService.deleteCategory(this.state.checkedCategories[0])
                .then((result) => {
                    if (result.Message === "Success") {
                        this.getCategories()
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    searchCategory(e) {
        console.log(e);
    }

    onShowSearchBox(e) {
        if (e === false) {
            this.getCategories();
        }
    }

    onClearSearchBox() {
        this.getCategories();
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

    selectePage(selectedPage) {
        this.setState({ selectedPage: selectedPage });
    }

    selectePagePostCategory(selectePage) {
        this.showPostByCategory(this.state.categoryByCode, selectePage, this.state.lastedId)
        console.log( this.state.lastedId)
        this.setState({
            selectePage: selectePage
        })
    }

    showPostByCategory(categoryCode, pageIndex, lastId) {
        console.log(categoryCode)
        console.log(pageIndex)
        if (categoryCode === "tin-hot") {
            this._categoryService.getHotPostByCategory(pageIndex)
                .then((result) => {
                    if (result.Message === "Success") {
                        result.Data.forEach(element => {
                            element.checked = false
                        });
                        this.setState({
                            postByCategorys: result.Data,
                            categoryByCode: categoryCode,
                            lastId: result.Data[result.Data.length -1].Id

                        })
                    }
                })
        }
        else {
            this._categoryService.getPostByCategory(categoryCode, pageIndex, lastId)
                .then((result) => {
                    if (result.Message === "Success") {
                        result.Data.forEach(element => {
                            element.checked = false
                        });
                        this.setState({
                            postByCategorys: result.Data,
                            categoryByCode: categoryCode,
                            lastedId:lastId
                        })
                    }
                })
        }

    }
    getTable(listSlide){
        console.log(listSlide)
       
    }
    render() {
        return (
            <div className="container-fullwidth">
                <Toolbars className="toolbar"
                    onDelete={e => this.deleteCategory(e)}
                    onOpenCreateModal={e => this.openCreateModal(e)}
                    onShowSearchBox={e => this.onShowSearchBox(e)}
                    onSearch={(opt, text) => this.searchCategory(text)}
                    onClearSearchBox={e => this.onClearSearchBox()}
                    valueOptions={this.state.categories}
                    searchOptions={[{ value: 1, text: "Theo tên chuyên mục" }]}
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
                                                    <label className="checkboxLabel">#
                                                        {/* <Input className="form-check-input" type="checkbox" checked={this.state.checkedAll} onChange={() => this.checkAll()} /> */}
                                                        <span className="label-text"></span>
                                                    </label>
                                                </th>
                                                <th scope="col" width="7%" className="centered">Độ ưu tiên</th>
                                                <th scope="col" width="30%" className="centered">Tên chuyên mục</th>
                                                <th scope="col" width="20%" className="centered">Mã chuyên mục</th>
                                                <th scope="col" width="20%" className="centered">Mô tả</th>
                                                <th scope="col" width="20%" className="centered">Xem bài viết</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.categories.map((category, index) =>
                                                    (< tr key={category.Id.toString()} >
                                                        <td className="centered">
                                                            <label className="checkboxLabel">
                                                                <Input className="form-check-input" type="checkbox" id={category.Id} name={category.Id} value={category.checked} checked={category.checked} onChange={() => this.checkOne(category.Id)} />
                                                                <span className="label-text"></span>
                                                            </label>
                                                        </td>
                                                        <td>{category.Ordinal}</td>
                                                        <td>
                                                            <span className="title" onClick={() => this.showCategoryDetail(category.Id)}>{category.Title}</span>
                                                        </td>
                                                        <td>{category.Code}</td>
                                                        <td>{category.Description}</td>
                                                        <td>
                                                            <Button color="primary" onClick={this.showPostByCategory.bind(this, category.Code,this.state.selectedPage,this.state.lastedId)}>Bài viết</Button>
                                                        </td>
                                                    </tr>)
                                                )}
                                        </tbody>
                                    </Table>
                                    <PaginationComponent totalItems={10000} pageSize={10} onSelect={this.selectePage.bind(this)} />
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader>Thống kê bài đăng</CardHeader>
                                <CardBody>
                                    <Table responsive hover bordered striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" width="3%" className="centered">
                                                    <label className="checkboxLabel">#
                                                        <span className="label-text"></span>
                                                    </label>
                                                </th>
                                                <th scope="col" width="45%" className="centered">Tiêu đề </th>
                                                <th scope="col" width="22%" className="centered"> Id</th>
                                                <th scope="col" width="15%" className="centered"> Đầu báo</th>
                                                <th scope="col" width="15%" className="centered">Chuyên mục AI</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.postByCategorys.map((postcategory, index) => 
                                                this.getTable(postcategory.ListSlide)
                                                (<tr key={index}>
                                                    <td className="centered">
                                                        <label className="checkbocLable">
                                                            <Input className="form-check-input" type="checkbox" id={postcategory.Id} name={postcategory.Id} value={postcategory.checked} checked={postcategory.checked} onChange={() => this.checkOne(postcategory.Id)} />
                                                            <span className="label-text"></span>
                                                        </label>
                                                    </td>
                                                    <td>{postcategory.Title}</td>
                                                    <td>{postcategory.Id}</td>
                                                    <td>{postcategory.PublisherShortName}</td>
                                                    <td>{postcategory.CategoryAi}</td>
                                                </tr>)
                                            )}
                                        </tbody>
                                    </Table>
                                    <PaginationComponent totalItems={10000} pageSize={10} onSelect={this.selectePagePostCategory.bind(this)} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.closeModal.bind(this)} className={'modal-lg ' + this.props.className} autoFocus={false}>
                        <ModalHeader toggle={this.closeModal.bind(this)}>Chuyên mục</ModalHeader>
                        <ModalBody className="modal-body">
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="title-input" className="title-required">Tên chuyên mục:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="text" id="title-input" name="title-input" autoFocus value={this.state.title} onChange={(e) => this.getTitle(e)} invalid={this.state.title === ""} />
                                    <FormFeedback valid={false}>Tên chuyên mục không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="code-input" className="title-required">Mã chuyên mục:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="text" id="code-input" name="code-input" value={this.state.code} onChange={(e) => this.getCode(e)} invalid={this.state.code === ""} />
                                    <FormFeedback valid={false}>Mã chuyên mục không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="ordinal-input" className="title-required">Độ ưu tiên:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="number" id="ordinal-input" name="ordinal-input" value={this.state.ordinal} onChange={(e) => this.getOrdinal(e)} invalid={(Number(this.state.ordinal) < 1) || (this.state.ordinal === "")} />
                                    <FormFeedback valid={false}>Độ ưu tiên không được bỏ trống và nhỏ hơn 0</FormFeedback>
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
                            {this.state.createModalMode ?
                                <Button color="primary" onClick={this.createCategory.bind(this)} disabled={(this.state.title === "") || (this.state.code === "") || (this.state.ordinal === "") || (Number(this.state.ordinal) < 1)}>Thêm mới</Button>
                                :
                                <Button color="primary" onClick={this.updateCategory.bind(this)} disabled={(this.state.title === "") || (this.state.code === "") || (this.state.ordinal === "") || (Number(this.state.ordinal) < 1)}>Cập nhật</Button>
                            }
                            <Button color="secondary" onClick={this.closeModal.bind(this)}>Hủy</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Categories;