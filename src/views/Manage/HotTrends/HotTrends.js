import React, { Component } from 'react';
import { Badge, Card, CardBody, Col, Row, Table, Modal, ModalBody, ModalHeader, Input, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import HotTrendsService from './HotTrendsService';
import PaginationComponent from "react-reactstrap-pagination";
import Notifications from './../../../components/Notifications'

// const Toolbars = React.lazy(() => import('./../../../components/Toolbars'));

class HotTrends extends Component {
    _hotTrendsService = new HotTrendsService();

    constructor(props) {
        super(props);

        this.state = {
            trendsTitle: [],

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
            activeTab: ['0', '1', '2', '3', '4'],
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
            statusOptions: [
                { key: -1, value: '--Chọn trạng thái bài báo--' },
                { key: 0, value: 'In Trash' },
                { key: 1, value: 'Unpublished' },
                { key: 2, value: 'Downloaded' },
                { key: 8, value: 'In Review' },
                { key: 9, value: 'Published' },
            ],
            categoryAi: "",
            subcategoryAi: "",

            subCategorySelects: [],
        };
        this.showPostPreview = this.showPostPreview.bind(this);
    }

    componentWillMount() {
        this.getTrendsTitle()
        this.getPostsTrend(1, this.state.selectedPage)

    }

    //Get Trends Title
    getTrendsTitle() {
        this._hotTrendsService.getTrendsTilte()
            .then((result) => {
                if (result.Message === "Success" && result.Data !== null) {
                    this.setState({
                        trendsTitle: result.Data
                    }, () => {
                        console.log(this.state.trendsTitle)
                    })
                } else if (result.Message === "Success" && result.Data == null) {
                    this.addNoti.addNotification("danger", "Không có dữ liệu được tìm thấy");
                    this.setState({
                        trendsTitle: []
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }

    //get Trend's Posts
    getPostsTrend(trendId, paggeIndex) {
        this._hotTrendsService.getPostsTrend(trendId, paggeIndex)
            .then((result) => {
                console.log(result.Data)
                if (result.Message === "Success" && result.Data !== null) {
                    result.Data.forEach(element => {
                        element.checked = false
                        element.statusText = this.state.statusOptions.find(el => el.key === element.Status).value
                    });
                    this.setState({
                        posts: result.Data
                    })
                } else if (result.Message === "Success" && result.Data == null) {
                    this.addNoti.addNotification("danger", "Không có dữ liệu được tìm thấy");
                    this.setState({
                        posts: []
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }

    //Close postPreviewModal 
    closePostPreviewModal() {
        this.setState({
            postPreviewModal: false,
        });
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
                    if (result.Message === "Success") {
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
        this.getPostsTrend(Number(this.state.activeTab[0]) + 1, selectedPage)
        this.setState({
            selectedPage: selectedPage
        });
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
                <p> Link gốc bài viết:
                    <a href={this.state.postedUrl} rel="noopener noreferrer" target="_blank">{this.state.postedUrl}</a>
                </p>

            </div >
        )
    }

    selectedTab(tabPane, tab) {

        const _temp = this.state.activeTab.slice()
        _temp[tabPane] = tab
        this.setState({
            activeTab: _temp,
        }, () => {
            console.log(tab)
            this.getPostsTrend(Number(tab) + 1, this.state.selectedPage)
        });
    }

    tabPane() {
        return (
            <>
                <Card>
                    <CardBody>
                        <Row>
                            <Col md="12" className="pagination">
                                <PaginationComponent totalItems={10000} pageSize={10} onSelect={this.selectedPage.bind(this)} />
                            </Col>
                        </Row>

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
                                    <th scope="col" width="12%" className="centered">Posted At</th>
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
                                        <td>{(new Date(post.PostedAt * 1000)).toLocaleString()}</td>
                                        <td>{post.statusText}</td>
                                    </tr>)
                                )}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>

                <Modal isOpen={this.state.postPreviewModal} toggle={this.closePostPreviewModal.bind(this)} className={'modal-lg ' + this.props.className} autoFocus={false}>
                    <ModalHeader toggle={this.closePostPreviewModal.bind(this)}>Bài đăng</ModalHeader>
                    <ModalBody>
                        {this.showPreview()}
                    </ModalBody>
                </Modal>
            </>
        )
    }

    render() {
        // let trendNumber = this.state.trendsTitle.length()
        return (
            <div className="animated fadeIn">
                <Notifications onAddNoti={e => this.addNoti = e}></Notifications>
                <Nav tabs>
                    {this.state.trendsTitle.map((trendTitle, index) =>
                        <NavItem key={index} >
                            <NavLink active={this.state.activeTab[0] === index.toString()} onClick={() => { this.selectedTab(0, index.toString()); }}>
                                {trendTitle.TrendTitle}
                            </NavLink>
                        </NavItem>

                    )}
                    {/* <NavItem>
                        <NavLink active={this.state.activeTab[0] === '1'} onClick={() => { this.selectedTab(0, '1'); }}>
                            <i className="fa fa-tasks"></i> &nbsp;Thống kê theo Status
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={this.state.activeTab[0] === '2'} onClick={() => { this.selectedTab(0, '2'); }}>
                            <i className="icon-book-open"></i>&nbsp;Thống kê theo Error Code
                        </NavLink>
                    </NavItem> */}
                </Nav>
                <TabContent activeTab={this.state.activeTab[0]}>
                    {this.tabPane()}
                </TabContent>
            </div>
        )
    }
}

export default HotTrends;