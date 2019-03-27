import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Input, Label, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import MultiSelectReact from 'multi-select-react';
import PaginationComponent from "react-reactstrap-pagination";
import PostService from './PostService';
import './../style.css';
import Widget04 from './../../Widgets/Widget04';
const Toolbars = React.lazy(() => import('./../../../components/Toolbars'));

class Posts extends Component {
    _postService = new PostService();

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            checkedPosts: [],
            checkedAll: false,
            selectedPage: 1,
            modal: false,
            activeTab: ['general', 'seo', 'tags', 'media', 'statistics'],
            createModalMode: Boolean,
            subCategorySelects: [],
        };
        this.showPostDetail = this.showPostDetail.bind(this);

    }

    // Show detail post
    showPostDetail(id) {
        this.setState({
            modal: !this.state.modal,
        });
    }

    // event unseclection in category list
    categoryOptionClicked(categorySelected) {
        this.setState({ categorySelects: categorySelected });
        this.setSubCategorySelects(categorySelected)
    }

    //event seclection in category options
    categorySelectedBadgeClicked(categorySelected) {
        this.setState({ categorySelects: categorySelected });
        this.setSubCategorySelects(categorySelected)
    }

    //set subcategory list through category selected
    setSubCategorySelects(categorySelected) {
        this.setState({
            subCategorySelects: []
        });

        categorySelected.forEach((cat, index) => {
            if (cat.value === true) {
                this.setState({
                    subCategorySelects: this.state.subCategorySelects.concat(this.state.subcategories[index].subCat)
                });
            }
        });
    }

    // event unseclection in subcategory list
    subCategoryOptionClicked(subCategorySelected) {
        this.setState({ subCategorySelects: subCategorySelected });
    }

    //event seclection in subcategory options
    subCategorySelectedBadgeClicked(categorySelected) {
        this.setState({ subCategorySelects: categorySelected });
    }

    checkAll() {
        this.setState({
            checkedAll: !this.state.checkedAll,
        }, () => {
            const Posts = this.state.posts;

            if (this.state.checkedAll) {
                const _temp = [];
                Posts.forEach(element => {
                    element.checked = this.state.checkedAll;
                    _temp.push(element.id)
                });
                this.setState({
                    checkedPosts: _temp
                });
            } else {
                Posts.forEach(element => {
                    element.checked = this.state.checkedAll;
                });
                this.setState({
                    checkedPost: []
                });
            }
            this.setState({
                posts: Posts
            })
        });
    }

    checkOne(id) {
        const Posts = this.state.posts;
        const checkedPost = Posts.find(element => element.id === id);
        checkedPost.checked = !checkedPost.checked;
        if (checkedPost.checked) {
            this.setState({
                checkedPosts: this.state.checkedPosts.concat([id]),
                checkedAll: Posts.find(element => element.checked === false) === undefined
            });
            // if (Posts.find(element => element.checked === false) === undefined) {
            //     this.setState({ checkedAll: true })
            // } else {
            //     this.setState({ checkedAll: false })
            // }
        } else {
            const _temp = this.state.checkedPosts
            _temp.splice(this.state.checkedPosts.indexOf(id), 1)
            this.setState({
                checkedPosts: _temp,
                checkedAll: false,
            });
        }
        this.setState({
            posts: Posts
        });
    }

    updatePost() {
        console.log("update");
    }

    deletePost() {
        console.log("deleted");
    }

    searchPost(e) {
        console.log(e);
    }

    selectePage(selectedPage) {
        this.setState({ selectedPage: selectedPage });
    }

    selectedTab(tabPane, tab) {
        const _temp = this.state.activeTab.slice()
        _temp[tabPane] = tab
        this.setState({
            activeTab: _temp,
        });
    }

    tabPane() {
        const selectedOptionsStyles = {
            color: "#3c763d",
            backgroundColor: "#dff0d8"
        };
        const optionsListStyles = {
            backgroundColor: "#fcf8e3",
            color: "#8a6d3b"
        };
        return (
            <>
                <TabPane tabId="general">
                    {
                        <div>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="publisher-input">Nguồn báo</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <Input type="text" id="publisher-input" name="publisher-input" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="multiple-select">Chuyên mục</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <MultiSelectReact
                                        options={this.state.categorySelects}
                                        optionClicked={this.categoryOptionClicked.bind(this)}
                                        selectedBadgeClicked={this.categorySelectedBadgeClicked.bind(this)}
                                        selectedOptionsStyles={selectedOptionsStyles}
                                        optionsListStyles={optionsListStyles} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="multiple-select">Chuyên mục con</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <MultiSelectReact
                                        options={this.state.subCategorySelects}
                                        optionClicked={this.subCategoryOptionClicked.bind(this)}
                                        selectedBadgeClicked={this.subCategorySelectedBadgeClicked.bind(this)}
                                        selectedOptionsStyles={selectedOptionsStyles}
                                        optionsListStyles={optionsListStyles} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="title-input">Tiêu đề</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <Input type="text" id="title-input" name="title-input" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="sapo-input">Sapo</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <Input type="textarea" name="sapo-input" id="sapo-input" rows="5" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="content-input">Nội dung</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <Input type="textarea" name="content-input" id="content-input" rows="15" />
                                </Col>
                            </FormGroup>
                        </div>
                    }
                </TabPane>
                <TabPane tabId="seo">
                    {`SEO`}
                </TabPane>
                <TabPane tabId="tags">
                    {
                        <div>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="tag-input">Tags</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <Input type="text" id="tag-input" name="tag-input" />
                                </Col>
                            </FormGroup>
                        </div>
                    }
                </TabPane>
                <TabPane tabId="media">
                    {
                        <div>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="thumb-image-url-input">Ảnh đại diện</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <Input type="textarea" id="thumb-image-url-input" name="thumb-image-url-input" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="image-url-input">Danh sách ảnh</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <Input type="textarea" id="image-url-input" name="image-url-input" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="video-url-input">Danh sách video</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <Input type="textarea" id="video-url-input" name="video-url-input" />
                                </Col>
                            </FormGroup>
                        </div>
                    }
                </TabPane>
                <TabPane tabId="statistics">
                    {
                        <div className="container">
                            <FormGroup row>
                                <Col md="4">
                                    {/* <Card className="text-white bg-primary">
                                        <CardBody className="pb-0">
                                            <Input className="text-white bg-primary text-value" type="text" id="tag-input" name="tag-input" value='1000' />
                                            <div>Lượt xem</div>
                                        </CardBody>
                                    </Card> */}
                                    <Widget04 icon="icon-people" color="primary" header="972" value="25" invert>Lượt xem</Widget04>
                                </Col>
                                <Col md="4">
                                    <Widget04 icon="icon-eye" color="info" header="972" value="25" invert>Lượt xem nhanh</Widget04>
                                </Col>
                                <Col md="4">
                                    <Widget04 icon="icon-speech" color="warning" header="972" value="25" invert>Lượt comment</Widget04>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3">
                                    <Widget04 icon="icon-like" color="primary" header="972" value="25" invert>Lượt like</Widget04>
                                </Col>
                                <Col md="3">
                                    <Widget04 icon="icon-dislike" color="danger" header="972" value="25" invert>Lượt dislike</Widget04>
                                </Col>
                                <Col md="3">
                                    <Widget04 icon="icon-share-alt" color="warning" header="972" value="25" invert>Lượt share</Widget04>
                                </Col>
                                <Col md="3">
                                    <Widget04 icon="icon-docs" color="info" header="972" value="25" invert>Lượt lưu</Widget04>
                                </Col>
                            </FormGroup>
                        </div>
                    }
                </TabPane>
            </>
        );
    }

    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Toolbars 
                            onDelete={e => this.deletePost(e)} 
                            onShowDetail={e => this.showPostDetail(e)} 
                            onSearch={e => this.searchPost(e)}
                            searchPlaceholder1={'Tìm kiếm theo tiêu đề'}
                            searchPlaceholder2={'Tìm kiếm theo trạng thái'}/>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Bài đăng
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
                                            <th scope="col">Tiêu đề</th>
                                            <th scope="col">Thể loại</th>
                                            <th scope="col">Ngày tạo</th>
                                            <th scope="col">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.posts.map((post, index) =>
                                            (< tr key={post.id.toString()} >
                                                <td >
                                                    <label className="checkboxLabel">
                                                        <Input className="form-check-input" type="checkbox" id={post.id} name={post.id} value={post.checked} checked={post.checked} onChange={() => this.checkOne(post.id)} />
                                                        <span className="label-text"></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <span className="title" onClick={() => this.showPostDetail(post.id)}>{post.name}</span>
                                                </td>
                                                <td>{post.role}</td>
                                                <td>{post.registered}</td>
                                                <td>{post.role}</td>
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
                    <ModalHeader toggle={this.showPostDetail}>Bài đăng</ModalHeader>
                    <ModalBody className="modal-body">
                        <Nav tabs>
                            <NavItem>
                                <NavLink active={this.state.activeTab[0] === 'general'} onClick={() => { this.selectedTab(0, 'general'); }}>
                                    <i className="fa fa-tasks"></i> &nbsp;Thông tin chung
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active={this.state.activeTab[0] === 'seo'} onClick={() => { this.selectedTab(0, 'seo'); }}>
                                    <i className="icon-book-open"></i>&nbsp;SEO
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active={this.state.activeTab[0] === 'tags'} onClick={() => { this.selectedTab(0, 'tags'); }}>
                                    <i className="fa fa-tags"></i>&nbsp;Thẻ tags
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active={this.state.activeTab[0] === 'media'} onClick={() => { this.selectedTab(0, 'media'); }}>
                                    <i className="fa fa-file-video-o"></i>&nbsp;Đa phương tiện
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active={this.state.activeTab[0] === 'statistics'} onClick={() => { this.selectedTab(0, 'statistics'); }}>
                                    <i className="fa fa-line-chart"></i>&nbsp;Thống kê
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab[0]}>
                            {this.tabPane()}
                        </TabContent>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updatePost}>Cập nhật</Button>{' '}
                        <Button color="secondary" onClick={this.showPostDetail}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Posts;