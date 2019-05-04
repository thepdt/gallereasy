import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, FormFeedback, Input, Label, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import MultiSelectReact from 'multi-select-react';
import Textarea from 'react-textarea-autosize';
import PostService from './PostService';
import PaginationComponent from "react-reactstrap-pagination";
import PublisherService from './../Publishers/PublisherService';
import Widget04 from './../../Widgets/Widget04';

import DateTimePicker from 'react-datetime-picker';
const Toolbars = React.lazy(() => import('./../../../components/Toolbars'));
class Posts extends Component {
    _postService = new PostService();
    _publisherService = new PublisherService();

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            publishers: [],
            checkedPosts: [],
            checkedAll: false,
            searchSelectedPage: 1,
            selectedPage: 1,
            searchMode: false,
            searchText: "",
            postDetailModal: false,
            postPreviewModal: false,
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
            categoryAi: "",
            subcategoryAi: "",

            fromDatePicked: new Date(),
            toDatePicked: new Date(),
            subCategorySelects: [],
        };
        this.showPostPreview = this.showPostPreview.bind(this);
    }

    componentWillMount() {
        var date = this.state.fromDatePicked
        console.log(date.getDate() + 6);
        // console.log(this.state.fromDatePicked.setDate(this.state.fromDatePicked.getDate() - 1));
        this.getPosts(this.state.fromDatePicked, this.state.toDatePicked, this.state.selectedPage)
        // console.log(this.state.datePicked);
        // console.log(this.state.datePicked.getTime());
    }

    fromDateChange = date => {
        console.log(date);
        this.setState({
            fromDatePicked: date,
        }, () => {
            if (this.state.fromDatePicked !== null) {
                this.getPosts(this.state.fromDatePicked, this.state.toDatePicked, this.state.selectedPage)
            }
        })
    }

    toDateChange = date => {
        console.log(date.getTime());
        this.setState({
            toDatePicked: date,
        }, () => {
            if (this.state.toDatePicked !== null) {
                this.getPosts(this.state.fromDatePicked, this.state.toDatePicked, this.state.selectedPage)
            }
        })
    }

    //get posts
    getPosts(fromDate, toDate, paggeIndex) {
        console.log((fromDate.getTime()));
        console.log(String(fromDate.getTime()).slice(0, 10));
        this._postService.getPosts(String(fromDate.getTime()).slice(0, 10), String(toDate.getTime()).slice(0, 10), paggeIndex)
            .then((result) => {
                console.log(result);
                if (result.StatusCode === 200 && result.Data !== null) {
                    result.Data.forEach(element => {
                        element.checked = false
                        element.statusText = this.state.statusOptions.find(el => el.key === element.Status).value
                    });
                    this.setState({
                        posts: result.Data
                    })
                } else if (result.StatusCode === 200 && result.Data == null) {
                    this.setState({
                        posts: []
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }

    getPostByTitle(text) {
        this._postService.getPostByTitle(text)
            .then((result) => {
                console.log(result);
                if (result.StatusCode === 200 && result.Data !== null) {
                    result.Data.forEach(element => {
                        element.checked = false
                        element.statusText = this.state.statusOptions.find(el => el.key === element.Status).value
                    });
                    this.setState({
                        posts: result.Data
                    })
                } else if (result.StatusCode === 200 && result.Data === null) {
                    this.setState({
                        posts: []
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }

    //get posts by publisher
    getPostsByPublisher(publisherId, paggeIndex) {
        this._postService.getPostsByPublisher(publisherId, paggeIndex)
            .then((result) => {
                console.log(result);
                if (result.StatusCode === 200 && result.Data !== null) {
                    result.Data.forEach(element => {
                        element.checked = false
                        element.statusText = this.state.statusOptions.find(el => el.key === element.Status).value
                    });
                    this.setState({
                        posts: result.Data
                    })
                } else if (result.StatusCode === 200 && result.Data === null) {
                    this.setState({
                        posts: []
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }

    //get publishers
    getPublishers() {
        this._publisherService.getPublishers()
            .then((result) => {
                if (result.StatusCode === 200 && result.Data !== null) {
                    this.setState({
                        publishers: result.Data
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }

    //Close postDetailModal 
    closePostDetailModal() {
        this.setState({
            postDetailModal: !this.state.postDetailModal,
            activeTab: ['general']
        });
    }


    //Close postPreviewModal 
    closePostPreviewModal() {
        this.setState({
            postPreviewModal: false,
        });
    }

    //Add a new  post
    openCreateModal() {
        this.setState({
            postDetailModal: !this.state.postDetailModal,
            createModalMode: true,
            publisher: "",
            title: "",
            abstract: "",
            contents: "",
            tags: "",
            category: "",
            categorySubLevel1: "",
            categorySubLevel2: "",
            categoryAi: "",
            subcategoryAi: "",
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
            CategoryAi: this.state.categoryAi,
            SubcategoryAi: this.state.subcategoryAi,
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
            postDetailModal: !this.state.postDetailModal,
        });
    }

    showDetailPost() {
        this.setState({
            postDetailModal: true,
            postPreviewModal: false
        })
    }

    backToPreviewPost() {
        this.setState({
            postDetailModal: false,
            postPreviewModal: true
        })
    }

    // Show preview post
    showPostPreview(id) {
        if (id !== null) {
            const postSelected = this.state.posts.find(element => element.Id === id)
            this.setState({
                postPreviewModal: true,
                createModalMode: false,
                id: postSelected.Id,
                publisher: postSelected.Publisher,
                category: postSelected.Category,
                categorySubLevel1: postSelected.CategorySubLevel1,
                categorySubLevel2: postSelected.CategorySubLevel2,
                categoryAi: postSelected.CategoryAi,
                subcategoryAi: postSelected.SubcategoryAi,
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
                postedUrl: postSelected.PostedUrl,
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
            CategorySubLevel1: this.state.categorySubLevel1,
            CategorySubLevel2: this.state.categorySubLevel2,
            CategoryAi: this.state.categoryAi,
            SubcategoryAi: this.state.subcategoryAi,
            ImageThumbUrl: this.state.imageThumbUrl,
            ImageUrls: this.state.imageUrls,
            VideoUrls: this.state.videoUrls,
            PostedUrl: this.state.postedUrl,
            Status: this.state.status,
            PostedAt: this.state.postedAt,
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
            postDetailModal: false,
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

    searchPost(opt, text) {
        if (opt === 1) {
            this.getPostsByPublisher(text.value, 1)
            this.setState({
                searchMode: true,
                searchText: text.value
            })
        } else if (opt === 2) {
            console.log(text);
            this.getPostByTitle(text)
        }
    }

    onShowSearchBox(e) {
        if (e) {
            this.getPublishers()
        } else {
            this.getPosts(this.state.fromDatePicked, this.state.toDatePicked, this.state.selectedPage)
            this.setState({
                searchMode: false
            })
        }
    }

    onClearSearchBox() {
        this.getPosts(this.state.fromDatePicked, this.state.toDatePicked, this.state.selectedPage);
        this.setState({
            searchMode: false
        })
    }

    getPublisher(event) {
        this.setState({
            publisher: event.target.value
        })
    }

    getPostedUrl(event) {
        this.setState({
            postedUrl: event.target.value
        })
    }

    getCategory(event) {
        this.setState({
            category: event.target.value
        })
    }

    getCategorySubLevel1(event) {
        this.setState({
            categorySubLevel1: event.target.value
        })
    }

    getCategorySubLevel2(event) {
        this.setState({
            categorySubLevel2: event.target.value
        })
    }

    getCategoryAi(event) {
        this.setState({
            categoryAi: event.target.value
        })
    }
    getSubcategoryAi(event) {
        this.setState({
            subcategoryAi: event.target.value
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
        _contents[index].Url = event.target.value
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

    getContentThumbImageUrl(event, index) {
        const _contents = this.state.contents
        _contents[index].S3ThumbUrl = event.target.value
        this.setState({
            contents: _contents
        })
    }

    getContentVideoUrl(event, index) {
        const _contents = this.state.contents
        _contents[index].Url = event.target.value
        this.setState({
            contents: _contents
        })
    }

    getContentVideoCaption(event, index) {
        const _contents = this.state.contents
        _contents[index].VideoCaption = event.target.value
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

    selecteSearchPage(searchSelectedPage) {
        this.getPostsByPublisher(this.state.searchText, searchSelectedPage)
        this.setState({
            searchSelectedPage: searchSelectedPage
        });
    }

    selectedPage(selectedPage) {
        this.getPosts(this.state.fromDatePicked, this.state.toDatePicked, selectedPage)
        this.setState({
            selectedPage: selectedPage
        });
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
                                    <Label htmlFor="publisher-input" className="title-required">Nguồn báo</Label>
                                </Col>
                                <Col xs="12" md="10">
                                    <Input type="text" id="publisher-input" name="publisher-input" autoFocus value={this.state.publisher} onChange={(e) => this.getPublisher(e)} invalid={this.state.publisher === ""} />
                                    <FormFeedback valid={false}>Nguồn báo không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            {this.state.createModalMode ?
                                <>
                                    <FormGroup row>
                                        <Col md="1">
                                            <Label htmlFor="multiple-select" className="title-required">Chuyên mục</Label>
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
                                            <Label htmlFor="multiple-select" className="title-required">Chuyên mục con</Label>
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
                                </>
                                :
                                <>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="postedUrl-input" >Link bài báo</Label>
                                        </Col>
                                        <Col xs="12" md="10">
                                            {/* <Input type="text" id="postedUrl-input" name="postedUrl-input" value={this.state.postedUrl} onChange={(e) => this.getPostedUrl(e)}/> */}
                                            <a href={this.state.postedUrl} rel="noopener noreferrer" target="_blank">{this.state.postedUrl}</a>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="category-input" className="title-required">Chuyên mục</Label>
                                        </Col>
                                        <Col xs="12" md="10">
                                            <Input type="text" id="category-input" name="category-input" value={this.state.category} onChange={(e) => this.getCategory(e)} invalid={this.state.category === ""} />
                                            <FormFeedback valid={false}>Chuyên mục không được bỏ trống</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="categorySubLevel1-input" className="title-required">Chuyên mục con 1</Label>
                                        </Col>
                                        <Col xs="12" md="10">
                                            <Input type="text" id="categorySubLevel1-input" name="categorySubLevel1-input" value={this.state.categorySubLevel1} onChange={(e) => this.getCategorySubLevel1(e)} invalid={this.state.categorySubLevel1 === ""} />
                                            <FormFeedback valid={false}>Chuyên mục con không được bỏ trống</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="categorySubLevel2-input">Chuyên mục con 2</Label>
                                        </Col>
                                        <Col xs="12" md="10">
                                            <Input type="text" id="categorySubLevel2-input" name="categorySubLevel2-input" value={this.state.categorySubLevel2} onChange={(e) => this.getCategorySubLevel2(e)} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="categoryAi-input">Chuyên mục AI</Label>
                                        </Col>
                                        <Col xs="12" md="10">
                                            <Input type="text" id="categoryAi-input" name="categoryAi-input" value={this.state.categoryAi} onChange={(e) => this.getCategoryAi(e)} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="subcategoryAi-input">Chuyên mục con AI</Label>
                                        </Col>
                                        <Col xs="12" md="10">
                                            <Input type="text" id="subcategoryAi-input" name="subcategoryAi-input" value={this.state.subcategoryAi} onChange={(e) => this.getSubcategoryAi(e)} />
                                        </Col>
                                    </FormGroup>
                                </>
                            }
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
                                    <Label htmlFor="title-input" className="title-required">Tiêu đề</Label>
                                </Col>
                                <Col xs="12" md="10">
                                    <Input type="textarea" id="title-input" name="title-input" rows="2" value={this.state.title} onChange={(e) => this.getTitle(e)} invalid={this.state.title === ""} />
                                    <FormFeedback valid={false}>Tiêu đề không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="2">
                                    <Label htmlFor="abstract-input" className="title-required">Abstract</Label>
                                </Col>
                                <Col xs="12" md="10">
                                    <Input type="textarea" name="abstract-input" id="abstract-input" rows="4" value={this.state.abstract} onChange={(e) => this.getAbstract(e)} invalid={this.state.abstract === ""} />
                                    <FormFeedback valid={false}>Abstract không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="2">
                                    <Label htmlFor="contents-input" className="title-required">Nội dung</Label>
                                </Col>
                                <Col xs="12" md="10">
                                    {this.state.contents.map((content, index) => {
                                        if (content.Tag === "image") {
                                            return (
                                                <div key={content.SubId.toString()}>
                                                    <FormGroup row>
                                                        <Col md="2">
                                                            <Label htmlFor="imageUrl-input">Link ảnh</Label>
                                                        </Col>
                                                        <Col xs="12" md="10">
                                                            <img className="image" src={content.Url} alt={content.ImageCaption} />
                                                            <Textarea className="col-md-12" minRows={1} name="imageUrl-input" id={"imageUrl" + content.SubId} value={content.Url} onChange={(e) => this.getContentImageUrl(e, index)} />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Col md="2">
                                                            <Label htmlFor="imageCaption-input">Caption ảnh</Label>
                                                        </Col>
                                                        <Col xs="12" md="10">
                                                            <Textarea className="col-md-12" minRows={1} name="imageCaption-input" id={"captionImage" + content.SubId} value={content.Caption} onChange={(e) => this.getContentImageCaption(e, index)} />
                                                        </Col>
                                                    </FormGroup>
                                                </div>
                                            )
                                        } else if (content.Tag === "video") {
                                            return (
                                                <div key={content.SubId.toString()}>
                                                    <FormGroup row>
                                                        <Col md="2">
                                                            <Label htmlFor="thumbImageUrl-input">Link ảnh thumbnail</Label>
                                                        </Col>
                                                        <Col xs="12" md="10">
                                                            <img className="thumbImage" src={content.S3ThumbUrl} alt={content.S3ThumbUrl} />
                                                            <Textarea className="col-md-12" minRows={1} name="thumbImageUrl-input" id={"thumbImageUrl" + content.SubId} value={content.S3ThumbUrl} onChange={(e) => this.getContentThumbImageUrl(e, index)} />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Col md="2">
                                                            <Label htmlFor="videoUrl-input">Link video</Label>
                                                        </Col>
                                                        <Col xs="12" md="10">
                                                            <video width="400" controls>
                                                                <source src={content.Url} type="video/mp4" />
                                                            </video>
                                                            <Textarea className="col-md-12" minRows={1} name="videoUrl-input" id={"videoUrl" + content.SubId} value={content.Url} onChange={(e) => this.getContentVideoUrl(e, index)} />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Col md="2">
                                                            <Label htmlFor="videoCaption-input">Caption video</Label>
                                                        </Col>
                                                        <Col xs="12" md="10">
                                                            <Textarea className="col-md-12" minRows={1} name="videoCaption-input" id={"captionVideo" + content.SubId} value={content.Caption} onChange={(e) => this.getContentVideoCaption(e, index)} />
                                                        </Col>
                                                    </FormGroup>
                                                </div>
                                            )
                                        }
                                        return (
                                            <Textarea className="col-md-12" minRows={1} key={content.SubId.toString()} name="contents-input" id={content.SubId} value={content.Text} onChange={(e) => this.getContent(e, index)} />
                                        )
                                    })}
                                    <FormFeedback valid={false}>Nội dung không được bỏ trống</FormFeedback>
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
                                <Col md="2">
                                    <Label htmlFor="tag-input" className="title-required">Tags</Label>
                                </Col>
                                <Col xs="12" md="10">
                                    <Input type="text" id="tag-input" name="tag-input" value={this.state.tags} onChange={(e) => this.getTags(e)} invalid={this.state.tags.length === []} />
                                    <FormFeedback valid={false}>Tags không được bỏ trống</FormFeedback>
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


    showPreview() {
        return (
            <div className="container container-fluid">
                <Row>
                    <Col md="6" className="pl-0">
                        <ul className="breadCrumbs">
                            {(this.state.category !== "") && (
                                <li><p>{this.state.category}</p></li>
                            )}
                            {(this.state.categorySubLevel1 !== "") && (
                                <li><p>{this.state.categorySubLevel1}</p></li>
                            )}
                            {(this.state.categorySubLevel2 !== "") && (
                                <li><p>{this.state.categorySubLevel2}</p></li>
                            )}
                        </ul>
                    </Col>
                    <Col md="6">
                        <Row className="text-right">
                            <Col md="12">
                                <Badge className="publisher_badge text-right" color="primary">{this.state.publisher}</Badge>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <p id="preview_postedAt">{(new Date(this.state.postedAt * 1000)).toLocaleString()}</p>
                <div id="preview_tags">
                    <strong>{"Tags: "}</strong>
                    {
                        this.state.tags.map((tag, index) => {
                            return (
                                <span key={index}>{tag + ", "}</span>
                            )
                        })
                    }
                </div>
                <h2 id="preview_title">{this.state.title}</h2>
                <h5 id="preview_abstract">{this.state.abstract}</h5>
                {
                    this.state.contents.map((content, index) => {
                        if (content.Tag === "image") {
                            return (
                                <div key={content.SubId.toString()}>
                                    <img id={"preview_content_image_" + content.SubId} className="preview_content_image" src={content.Url} alt={content.ImageCaption} />
                                    <p id={"preview_content_captionImage_" + content.SubId} className="media-caption">{content.Caption}</p>
                                </div>
                            )
                        } else if (content.Tag === "video") {
                            return (
                                <div key={content.SubId.toString()}>

                                    {/* <img id={"preview_content_thumbImage_" + content.SubId} className="preview_content_thumbImage" src={content.S3ThumbUrl} alt={content.S3ThumbUrl} /> */}

                                    <video className="preview_content_video" controls>
                                        <source src={content.Url} type="video/mp4" />
                                    </video>
                                    <p id={"preview_content_captionVideo_" + content.SubId} className="media-caption">{content.Caption}</p>
                                </div>
                            )
                        } else if (content.Tag === "p") {
                            return (
                                <div key={content.SubId.toString()}>
                                    <p id={"preview_content_paragraph_" + content.SubId}>{content.Text} </p>
                                </div>
                            )
                        } else if (content.Tag === "strong") {
                            return (
                                <div key={content.SubId.toString()}>
                                    <strong id={"preview_content_strong_" + content.SubId}><p>{content.Text}</p></strong>
                                </div>
                            )
                        }
                        return (
                            <div key={content.SubId.toString()} className="author">
                                <p id={"preview_content_author_" + content.SubId}>{content.Text} </p>
                            </div>
                        )
                    })
                }

                <p> Link gốc bài viết:
                    <a href={this.state.postedUrl} rel="noopener noreferrer" target="_blank">{this.state.postedUrl}</a>
                </p>

            </div >
        )
    }

    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Toolbars
                            onDelete={e => this.deletePost(e)}
                            onOpenCreateModal={e => this.openCreateModal(e)}
                            onShowSearchBox={e => this.onShowSearchBox(e)}
                            onSearch={(opt, text) => this.searchPost(opt, text)}
                            onClearSearchBox={e => this.onClearSearchBox()}
                            valueOptions={this.state.publishers}
                            searchOptions={[{ value: 1, text: "Theo đầu báo" }, { value: 2, text: "Theo tên bài báo" }]}
                            searchPlaceholder1={'Tìm kiếm theo đầu báo'}
                            searchPlaceholder2={'Tìm kiếm theo tên bài báo'}
                        />
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Bài đăng
                            </CardHeader>
                            <CardBody>
                                {this.state.searchMode ?
                                    <Row className="right">
                                        <PaginationComponent totalItems={100} pageSize={10} onSelect={this.selecteSearchPage.bind(this)} />
                                    </Row> :
                                    <Row>
                                        <Col md="12" className="pagination">
                                            {/* <Row> */}
                                            <DateTimePicker onChange={this.fromDateChange} value={this.state.fromDatePicked} />
                                            <DateTimePicker onChange={this.toDateChange} value={this.state.toDatePicked} />
                                            <PaginationComponent totalItems={100} pageSize={10} onSelect={this.selectedPage.bind(this)} />

                                            {/* </Row> */}
                                        </Col>
                                    </Row>
                                }
                                <Table responsive hover bordered striped>
                                    <thead>
                                        <tr>
                                            <th scope="col" width="3%" className="centered">
                                                <label className="checkboxLabel">#
                                                    {/* <Input className="form-check-input" type="checkbox" checked={this.state.checkedAll} onChange={() => this.checkAll()} /> */}
                                                    <span className="label-text"></span>
                                                </label>
                                            </th>
                                            <th scope="col" width="45%" className="centered">Tiêu đề</th>
                                            <th scope="col" width="10%" className="centered">Đầu báo</th>
                                            <th scope="col" width="10%" className="centered">Chuyên mục</th>
                                            <th scope="col" width="10%" className="centered">Chuyên mục AI</th>
                                            <th scope="col" width="12%" className="centered">Ngày tạo</th>
                                            <th scope="col" width="10%" className="centered">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.posts.map((post, index) =>
                                            (< tr key={post.Id.toString()} >
                                                <td className="centered">
                                                    <label className="checkboxLabel">
                                                        <Input className="form-check-input" type="checkbox" id={post.Id} name={post.Id} value={post.checked} checked={post.checked} onChange={() => this.checkOne(post.Id)} />
                                                        <span className="label-text"></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <span className="title" onClick={() => this.showPostPreview(post.Id)}>{post.Title}</span>
                                                </td>
                                                <td>{post.Publisher}</td>
                                                <td>{post.Category}</td>
                                                <td>{post.CategoryAi}</td>
                                                <td>{(new Date(post.CreatedAt * 1000)).toLocaleString()}</td>
                                                <td>{post.statusText}</td>
                                            </tr>)
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={this.state.postDetailModal} toggle={this.closePostDetailModal.bind(this)} className={'modal-lg ' + this.props.className} autoFocus={false}>
                    <ModalHeader toggle={this.closePostDetailModal.bind(this)}>Bài đăng</ModalHeader>
                    <ModalBody>
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
                        <Button className="left preview-btn" color="danger" onClick={this.backToPreviewPost.bind(this)}>Quay lại</Button>
                        {this.state.createModalMode ?
                            <Button color="primary" onClick={this.createPost.bind(this)} >Thêm mới</Button>
                            :
                            <Button color="primary" onClick={this.updatePost.bind(this)} disabled={(this.state.publisher === "") || (this.state.category === "") || (this.state.categorySubLevel1 === "") || (this.state.title === "") || (this.state.abstract === "") || (this.state.tags.length === 0)}>Cập nhật</Button>
                        }
                        <Button color="secondary" onClick={this.closePostDetailModal.bind(this)}>Hủy</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.postPreviewModal} toggle={this.closePostPreviewModal.bind(this)} className={'modal-lg ' + this.props.className} autoFocus={false}>
                    <ModalHeader toggle={this.closePostPreviewModal.bind(this)}>Bài đăng</ModalHeader>
                    <ModalBody>
                        {this.showPreview()}
                    </ModalBody>
                    <ModalFooter>
                        <Button className="left preview-btn" color="success" onClick={this.showDetailPost.bind(this)}>Sửa</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Posts;