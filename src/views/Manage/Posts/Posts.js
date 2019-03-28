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
            id: "",
            publisher: "",
            title: "",
            abstract: "",
            contents: [],
            tags: [],
            category: "",
            categorySubLevel1: "",
            categorySubLevel2: "",
            imageThumbUrl: "",
            imageUrls: "",
            videoUrls: "",
            viewCount: "",
            quickViewCount: "",
            commentCount: "",
            likeCount: "",
            dislikeCount: "",
            shareCount: "",
            saveCount: "",
            createAt: "",
            lastUpdatedAt: "",
            publishedAt: "",
            postedAt: "",
            postedUrl: "",
            status: Number,
            statusOptions: [{ key: -1, value: '--Chọn loại đầu báo--' }, { key: 0, value: 'In Trash' }, { key: 1, value: 'Unpublished' }, { key: 2, value: 'In Review' }, { key: 3, value: 'Published' },],

            subCategorySelects: [],
        };
        this.showPostDetail = this.showPostDetail.bind(this);
    }

    componentWillMount() {
        this.getPosts()
    }

    //get all categories
    getPosts() {
        this._postService.getPosts()
            .then((result) => {
                if (result.StatusCode === 200 && result.Data !== null) {
                    result.Data.forEach(element => {
                        element.checked = false
                        element.statusText = this.state.statusOptions.find(el => el.key === element.Status).value
                    });
                    this.setState({
                        posts: result.Data
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
            activeTab: ['general']
        });
    }

    //Add a new  post
    openCreateModal() {
        this.setState({
            modal: !this.state.modal,
            createModalMode: true,
            publisher: "",
            title: "",
            abstract: "",
            contents: "",
            tags: "",
            categoriesId: "",
            categorySubLevel1: "",
            categorySubLevel2: "",
            imageThumbUrl: "",
            imageUrls: "",
            VideoUrls: "",
            viewCount: "",
            quickViewCount: "",
            commentCount: "",
            likeCount: "",
            dislikeCount: "",
            shareCount: "",
            saveCount: "",
            createAt: "",
            lastUpdatedAt: "",
            publishedAt: "",
            postedAt: "",
            postedUrl: "",
            status: "",
        });
    }

    createPost() {
        const data = {
            Publisher: this.state.publisher,
            Title: this.state.title,
            Abstract: this.state.abstract,
            Contents: this.state.contents,
            Tags: this.state.tags,
            CategoriesId: this.state.categoriesId,
            CategorySubLevel1: this.state.categorySubLevel1,
            CategorySubLevel2: this.state.categorySubLevel2,
            ImageThumbUrl: this.state.imageThumbUrl,
            ImageUrls: this.state.imageUrls,
            VideoUrls: this.state.videoUrls,
            PostedUrl: this.state.postedUrl,
            Status: this.state.status
        }
        this._postService.createPost(data)
            .then((result) => {
                if (result.StatusCode === 200 && result.Data !== null) {
                    result.Data.checked = false;
                    result.Data.statusText = this.state.statusOptions.find(el => el.key === result.Data.Status).value
                    this.setState({
                        posts: this.state.posts.concat(result.Data)
                    })
                }
            }).catch((err) => {
                console.log("err: " + err);
            });

        this.setState({
            modal: !this.state.modal,
        });
    }

    // Show detail post
    showPostDetail(id) {
        if (id !== null) {
            const postSelected = this.state.posts.find(element => element.Id === id)
            this.setState({
                modal: !this.state.modal,
                createModalMode: false,
                id: postSelected.Id,
                publisher: postSelected.Publisher,
                category: postSelected.Category,
                categorySubLevel1: postSelected.CategorySubLevel1,
                categorySubLevel2: postSelected.CategorySubLevel2,
                title: postSelected.Title,
                abstract: postSelected.Abstract,
                contents: postSelected.Contents,
                tags: postSelected.Tags,
                imageThumbUrl: postSelected.ImageThumbUrl,
                imageUrls: postSelected.ImageUrls,
                videoUrls: postSelected.VideoUrls,
                viewCount: postSelected.ViewCount,
                quickViewCount: postSelected.QuickViewCount,
                commentCount: postSelected.CommentCount,
                likeCount: postSelected.LikeCount,
                dislikeCount: postSelected.DislikeCount,
                shareCount: postSelected.ShareCount,
                saveCount: postSelected.SaveCount,
                postedAt: postSelected.PostedAt,
                status: postSelected.Status
            });
        }
    }

    updatePost() {
        const data = {
            Id: this.state.id,
            Publisher: this.state.publisher,
            Title: this.state.title,
            Abstract: this.state.abstract,
            Contents: this.state.contents,
            Tags: this.state.tags,
            Category: this.state.category,
            categorySubLevel1: this.state.categorySubLevel1,
            categorySubLevel2: this.state.categorySubLevel2,
            ImageThumbUrl: this.state.imageThumbUrl,
            ImageUrls: this.state.imageUrls,
            VideoUrls: this.state.videoUrls,
            PostedUrl: this.state.postedUrl,
            Status: this.state.status,
            PostedAt: this.state.postedAt,
            Status: this.state.status
        }

        this._postService.updatePost(data)
            .then((result) => {
                if (result.StatusCode === 200 && result.Data !== null) {
                    result.Data.checked = false;
                    result.Data.statusText = this.state.statusOptions.find(el => el.key === result.Data.Status).value
                    const _posts = this.state.posts
                    const index = _posts.findIndex(el => el.Id === result.Data.Id)
                    _posts[index] = result.Data

                    this.setState({
                        posts: _posts
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });

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

    checkMulti(id) {
        const Posts = this.state.posts;
        const checkedPost = Posts.find(element => element.id === id);
        checkedPost.checked = !checkedPost.checked;
        if (checkedPost.checked) {
            this.setState({
                checkedPosts: this.state.checkedPosts.concat([id]),
                checkedAll: Posts.find(element => element.checked === false) === undefined
            });
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

    checkOne(Id) {
        const Posts = this.state.posts;
        const index = Posts.findIndex(element => element.Id === Id);
        for (var i = 0; i < Posts.length; i++) {
            if (i !== index) {
                Posts[i].checked = false
            } else {
                Posts[index].checked = !Posts[index].checked
            }
        }
        if (Posts[index].checked) {
            this.setState({
                checkedPosts: [Id],
            });
        } else {
            this.setState({
                checkedPosts: [],
            });
        }
        this.setState({
            posts: Posts
        });
    }

    deletePost() {
        if (this.state.checkedPosts.length !== 0) {
            this._postService.deletePost(this.state.checkedPosts[0])
                .then((result) => {
                    if (result.StatusCode === 200) {
                        const _posts = this.state.posts
                        const index = _posts.findIndex(el => el.Id === this.state.checkedPosts[0])
                        _posts.splice(index, 1);
                        this.setState({
                            posts: _posts
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    searchPost(e) {
        console.log(e);
    }

    getPublisher(event) {
        this.setState({
            publisher: event.target.value
        })
    }

    getCategoriesId(event) {
        this.setState({
            categoriesId: event.target.value
        })
    }
    
    getCategorySubLevel1 (event) {
        this.setState({
            categorySubLevel1: event.target.value
        })
    }
    
    getCategorySubLevel2 (event) {
        this.setState({
            categorySubLevel2: event.target.value
        })
    }

    getTitle(event) {
        this.setState({
            title: event.target.value
        })
    }

    getAbstract(event) {
        this.setState({
            abstract: event.target.value
        })
    }

    getContent(event, index) {
        const _contents = this.state.contents
        _contents[index].Text = event.target.value
        this.setState({
            contents: _contents
        })
    }

    getContentImageUrl(event, index) {
        const _contents = this.state.contents
        _contents[index].ImageUrl = event.target.value
        this.setState({
            contents: _contents
        })
    }

    getContentImageCaption(event, index) {
        const _contents = this.state.contents
        _contents[index].ImageCaption = event.target.value
        this.setState({
            contents: _contents
        })
    }

    getTags(event) {
        this.setState({
            tags: event.target.value
        })
    }

    getImageThumbUrl(event) {
        this.setState({
            imageThumbUrl: event.target.value
        })
    }

    getImageUrls(event) {
        this.setState({
            imageUrls: event.target.value
        })
    }

    getVideoUrls(event) {
        this.setState({
            videoUrls: event.target.value
        })
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
                                <Col md="2">
                                    <Label htmlFor="publisher-input">Nguồn báo</Label>
                                </Col>
                                <Col xs="12" md="10">
                                    <Input type="text" id="publisher-input" name="publisher-input" value={this.state.publisher} onChange={(e) => this.getPublisher(e)} />
                                </Col>
                            </FormGroup>
                            {/* <FormGroup row>
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
                            </FormGroup> */}
                            <FormGroup row>
                                <Col md="2">
                                    <Label htmlFor="title-input">Tiêu đề</Label>
                                </Col>
                                <Col xs="12" md="10">
                                    <Input type="text" id="title-input" name="title-input" value={this.state.title} onChange={(e) => this.getTitle(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="2">
                                    <Label htmlFor="abstract-input">Abstract</Label>
                                </Col>
                                <Col xs="12" md="10">
                                    <Input type="textarea" name="abstract-input" id="abstract-input" rows="5" value={this.state.abstract} onChange={(e) => this.getAbstract(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="2">
                                    <Label htmlFor="contents-input">Nội dung</Label>
                                </Col>
                                <Col xs="12" md="10">
                                    {this.state.contents.map((content, index) => {
                                        if (content.hasOwnProperty('Text')) {
                                            return (
                                                <Input key={content.SubId.toString()} type="textarea" name="contents-input" id={content.SubId} rows="5" value={content.Text} onChange={(e) => this.getContent(e, index)} />
                                            )
                                        }
                                        return (
                                            <div key={content.SubId.toString()}>
                                                <FormGroup row>
                                                    <Col md="2">
                                                        <Label htmlFor="imageUrl-input">Link ảnh</Label>
                                                    </Col>
                                                    <Col xs="12" md="10">
                                                        <img className="image" src={content.ImageUrl} alt={content.ImageCaption}/>
                                                        <Input type="textarea" name="imageUrl-input" id={"imageUrl" + content.SubId} rows="2" value={content.ImageUrl} onChange={(e) => this.getContentImageUrl(e, index)} />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md="2">
                                                        <Label htmlFor="imageUrl-input">Caption ảnh</Label>
                                                    </Col>
                                                    <Col xs="12" md="10">
                                                        <Input type="textarea" name="contents-input" id={"caption " + content.SubId} rows="2" value={content.ImageCaption} onChange={(e) => this.getContentImageCaption(e, index)} />
                                                    </Col>
                                                </FormGroup>
                                            </div>
                                        )
                                    })}
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
                                    <Input type="text" id="tag-input" name="tag-input" value={this.state.tags} onChange={(e) => this.getTags(e)} />
                                </Col>
                            </FormGroup>
                        </div>
                    }
                </TabPane>
                <TabPane tabId="media">
                    {
                        <div>
                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="thumb-image-url-input">Ảnh đại diện</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="textarea" id="thumb-image-url-input" name="thumb-image-url-input" value={this.state.imageThumbUrl} onChange={(e) => this.getImageThumbUrl(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="image-url-input">Danh sách ảnh</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    {/* <Input type="textarea" id="image-url-input" name="image-url-input"  value={this.state.imageUrls} onChange={(e) => this.getImageUrls(e)} /> */}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="video-url-input">Danh sách video</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    {/* <Input type="textarea" id="video-url-input" name="video-url-input"  value={this.state.videoUrls} onChange={(e) => this.getVideoUrls(e)} /> */}
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
                                    <Widget04 icon="icon-people" color="primary" header={this.state.viewCount.toString()} value="100" invert>Lượt xem</Widget04>
                                </Col>
                                <Col md="4">
                                    <Widget04 icon="icon-eye" color="info" header={this.state.quickViewCount.toString()} value="100" invert>Lượt xem nhanh</Widget04>
                                </Col>
                                <Col md="4">
                                    <Widget04 icon="icon-speech" color="warning" header={this.state.commentCount.toString()} value="100" invert>Lượt comment</Widget04>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3">
                                    <Widget04 icon="icon-like" color="primary" header={this.state.likeCount.toString()} value="100" invert>Lượt like</Widget04>
                                </Col>
                                <Col md="3">
                                    <Widget04 icon="icon-dislike" color="danger" header={this.state.dislikeCount.toString()} value="100" invert>Lượt dislike</Widget04>
                                </Col>
                                <Col md="3">
                                    <Widget04 icon="icon-share-alt" color="warning" header={this.state.shareCount.toString()} value="100" invert>Lượt share</Widget04>
                                </Col>
                                <Col md="3">
                                    <Widget04 icon="icon-docs" color="info" header={this.state.saveCount.toString()} value="100" invert>Lượt lưu</Widget04>
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
                            onOpenCreateModal={e => this.openCreateModal(e)}
                            onSearch={e => this.searchPost(e)}
                            searchPlaceholder1={'Tìm kiếm theo tiêu đề'}
                            searchPlaceholder2={'Tìm kiếm theo trạng thái'} />
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
                                            <th scope="col">Chuyên mục</th>
                                            <th scope="col">Ngày tạo</th>
                                            <th scope="col">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.posts.map((post, index) =>
                                            (< tr key={post.Id.toString()} >
                                                <td >
                                                    <label className="checkboxLabel">
                                                        <Input className="form-check-input" type="checkbox" id={post.Id} name={post.Id} value={post.checked} checked={post.checked} onChange={() => this.checkOne(post.Id)} />
                                                        <span className="label-text"></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <span className="title" onClick={() => this.showPostDetail(post.Id)}>{post.Title}</span>
                                                </td>
                                                <td>{post.Category}</td>
                                                <td>{post.CreatedAt}</td>
                                                <td>{post.statusText}</td>
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
                    <ModalHeader toggle={this.closeModal.bind(this)}>Bài đăng</ModalHeader>
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
                        {this.state.createModalMode ?
                            <Button color="primary" onClick={this.createPost.bind(this)}>Thêm mới</Button>
                            :
                            <Button color="primary" onClick={this.updatePost.bind(this)}>Cập nhật</Button>
                        }
                        <Button color="secondary" onClick={this.closeModal.bind(this)}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Posts;