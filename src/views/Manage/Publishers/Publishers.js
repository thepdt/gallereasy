import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Input, Label, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PaginationComponent from "react-reactstrap-pagination";
import PublisherService from './PublisherService';
import './../style.css';
import Widget04 from './../../Widgets/Widget04';
const Toolbars = React.lazy(() => import('./../../../components/Toolbars'));

class Publishers extends Component {
    _publisherService = new PublisherService();

    constructor(props) {
        super(props);

        this.state = {
            publishers: [],
            checkedPublishers: [],
            checkedAll: false,
            selectedPage: 1,
            modal: false,
            activeTab: ['general', 'statistics'],
            createModalMode: Boolean,
            id: "",
            title: "",
            code: "",
            kind: "",
            logoUrl: "",
            description: "",
            postCount: "",
            videoCount: "",
            followerCount: "",
            ordinal: "",
            kindTexts: [{ key: -1, value: '--Chọn loại đầu báo--' }, { key: 0, value: 'Báo lớn' }, { key: 1, value: 'Báo địa phương' }]
        };
        this.showPublisherDetail = this.showPublisherDetail.bind(this);

    }

    componentWillMount() {
        this.getPublishers()
    }

    //get all categories
    getPublishers() {
        this._publisherService.getPublishers()
            .then((result) => {
                console.log(result);
                if (result.StatusCode === 200 && result.Data !== null) {
                    result.Data.forEach(element => {
                        element.checked = false
                        element.kindText = this.state.kindTexts.find(el => el.key === element.Kind).value
                    });
                    this.setState({
                        publishers: result.Data
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

    //Add a new publisher
    openCreateModal() {
        this.setState({
            modal: !this.state.modal,
            createModalMode: true,
            title: "",
            code: "",
            description: "",
            postCount: "",
            videoCount: "",
            followerCount: "",
            kind: "",
            logoUrl: "",
            ordinal: "",
        });
    }

    createPublisher() {
        const data = {
            Title: this.state.title,
            Code: this.state.code,
            Description: this.state.description,
            LogoUrl: this.state.logoUrl,
            Kind: Number(this.state.kind),
            Ordinal: Number(this.state.ordinal)
        }
        this._publisherService.createPublisher(data)
            .then((result) => {
                if (result.StatusCode === 200 && result.Data !== null) {
                    result.Data.checked = false;
                    result.Data.kindText = this.state.kindTexts.find(el => el.key === result.Data.Kind).value
                    this.setState({
                        publishers: this.state.publishers.concat(result.Data)
                    })
                }
            }).catch((err) => {
                console.log("err: " + err);
            });

        this.setState({
            modal: !this.state.modal,
        });
    }

    // Show detail Publisher
    showPublisherDetail(id) {
        if (id !== null) {
            const publisherSelected = this.state.publishers.find(element => element.Id === id)
            this.setState({
                modal: !this.state.modal,
                createModalMode: false,
                id: publisherSelected.Id,
                title: publisherSelected.Title,
                code: publisherSelected.Code,
                description: publisherSelected.Description,
                postCount: publisherSelected.PostCount,
                videoCount: publisherSelected.VideoCount,
                followerCount: publisherSelected.FollowerCount,
                logoUrl: publisherSelected.LogoUrl,
                kind: publisherSelected.Kind,
                ordinal: publisherSelected.Ordinal
            });
        }
    }

    updatePublisher() {
        const data = {
            Id: this.state.id,
            Title: this.state.title,
            Code: this.state.code,
            Description: this.state.description,
            Kind: Number(this.state.kind),
            LogoUrl: this.state.logoUrl,
            Ordinal: Number(this.state.ordinal)
        }

        this._publisherService.updatePublisher(data)
            .then((result) => {
                if (result.StatusCode === 200 && result.Data !== null) {
                    result.Data.checked = false;
                    result.Data.kindText = this.state.kindTexts.find(el => el.key === result.Data.Kind).value
                    const _publishers = this.state.publishers
                    const index = _publishers.findIndex(el => el.Id === result.Data.Id)
                    _publishers[index] = result.Data

                    this.setState({
                        publishers: _publishers
                    })
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
            const Publishers = this.state.publishers;

            if (this.state.checkedAll) {
                const _temp = [];
                Publishers.forEach(element => {
                    element.checked = this.state.checkedAll;
                    _temp.push(element.Id)
                });
                this.setState({
                    checkedPublishers: _temp
                });
            } else {
                Publishers.forEach(element => {
                    element.checked = this.state.checkedAll;
                });
                this.setState({
                    checkedPublisher: []
                });
            }
            this.setState({
                publishers: Publishers
            })
        });
    }

    checkMulti(Id) {
        const Publishers = this.state.publishers;
        const checkedPublisher = Publishers.find(element => element.Id === Id);
        checkedPublisher.checked = !checkedPublisher.checked;
        if (checkedPublisher.checked) {
            this.setState({
                checkedPublishers: this.state.checkedPublishers.concat([Id]),
                checkedAll: Publishers.find(element => element.checked === false) === undefined
            });
        } else {
            const _temp = this.state.checkedPublishers
            _temp.splice(this.state.checkedPublishers.indexOf(Id), 1)
            this.setState({
                checkedPublishers: _temp,
                checkedAll: false,
            });
        }
        this.setState({
            publishers: Publishers
        });
    }

    checkOne(Id) {
        const Publishers = this.state.publishers;
        const index = Publishers.findIndex(element => element.Id === Id);
        for (var i = 0; i < Publishers.length; i++) {
            if (i !== index) {
                Publishers[i].checked = false
            } else {
                Publishers[index].checked = !Publishers[index].checked
            }
        }
        if (Publishers[index].checked) {
            this.setState({
                checkedPublishers: [Id],
            });
        } else {
            this.setState({
                checkedPublishers: [],
            });
        }
        this.setState({
            publishers: Publishers
        });
    }

    deletePublisher() {
        if (this.state.checkedPublishers.length !== 0) {
            this._publisherService.deletePublisher(this.state.checkedPublishers[0])
                .then((result) => {
                    if (result.StatusCode === 200) {
                        const _publishers = this.state.publishers
                        const index = _publishers.findIndex(el => el.Id === this.state.checkedPublishers[0])
                        _publishers.splice(index, 1);
                        this.setState({
                            publishers: _publishers
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    searchPublisher(e) {
        console.log(e);
    }

    selectedTab(tabPane, tab) {
        const _temp = this.state.activeTab.slice()
        _temp[tabPane] = tab
        this.setState({
            activeTab: _temp,
        });
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

    getOrdinal(event) {
        this.setState({
            ordinal: event.target.value
        })
    }

    getKind(event) {
        this.setState({
            kind: event.target.value
        })
    }

    getLogoUrl(event) {
        this.setState({
            logoUrl: event.target.value
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

    tabPane() {
        return (
            <>
                <TabPane tabId="general">
                    {
                        <div>
                            <FormGroup row>
                                <Col md="4">
                                    <Label htmlFor="title-input" className="title-required">Tên đầu báo:</Label>
                                </Col>
                                <Col xs="12" md="8">
                                    <Input type="text" id="title-input" name="title-input" value={this.state.title} onChange={(e) => this.getTitle(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4">
                                    <Label htmlFor="code-input" className="title-required">Mã đầu báo:</Label>
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
                                    <Label htmlFor="logoUrl-input" className="title-required">Logo đầu báo:</Label>
                                </Col>
                                <Col xs="12" md="8">
                                    <Input type="text" id="logoUrl-input" name="logoUrl-input" value={this.state.logoUrl} onChange={(e) => this.getLogoUrl(e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4">
                                    <Label htmlFor="kind-input" className="title-required">Loại đầu báo:</Label>
                                </Col>
                                <Col xs="12" md="8">
                                    <Input type="select" id="kind-input" name="kind-input" value={this.state.kind} onChange={(e) => this.getKind(e)}>
                                        {this.state.kindTexts.map((kind, index) =>
                                            (
                                                <option key={kind.key} value={kind.key}>{kind.value}</option>
                                            )
                                        )}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4">
                                    <Label htmlFor="description-input">Miêu tả:</Label>
                                </Col>
                                <Col xs="12" md="8">
                                    <Input type="text" id="description-input" name="description-input" value={this.state.description} onChange={(e) => this.getDescription(e)} />
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
                                    <Widget04 icon="icon-user-following" color="primary" header={this.state.followerCount.toString()} value="100" invert>Số người theo dõi</Widget04>
                                </Col>
                                <Col md="4">
                                    <Widget04 icon="fa fa-newspaper-o" color="info" header={this.state.postCount.toString()} value="100" invert>Số bài đăng lưu trên hệ thống</Widget04>
                                </Col>
                                <Col md="4">
                                    <Widget04 icon="fa fa-film" color="warning" header={this.state.videoCount.toString()} value="100" invert>Số videos lưu trên hệ thống</Widget04>
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
            <div className="container-fullwidth">
                <Toolbars
                    onDelete={e => this.deletePublisher(e)}
                    onOpenCreateModal={e => this.openCreateModal(e)}
                    onSearch={e => this.searchPublisher(e)}
                    searchPlaceholder1={'Tìm kiếm theo tên đầu báo'}
                    searchPlaceholder2={'Tìm kiếm theo mã đầu báo '} />
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
                                                <th scope="col" width="25%" className="centered">Tên đầu báo</th>
                                                <th scope="col" width="20%" className="centered">Mã đầu báo</th>
                                                <th scope="col" width="10%" className="centered">Loại đầu báo </th>
                                                <th scope="col" width="35%" className="centered">Mô tả</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.publishers.map((publisher, index) =>
                                                (< tr key={publisher.Id.toString()} >
                                                    <td className="centered">
                                                        <label className="checkboxLabel">
                                                            <Input className="form-check-input" type="checkbox" id={publisher.Id} name={publisher.Id} value={publisher.checked} checked={publisher.checked} onChange={() => this.checkOne(publisher.Id)} />
                                                            <span className="label-text"></span>
                                                        </label>
                                                    </td>
                                                    <td className="centered">{publisher.Ordinal}</td>
                                                    <td>
                                                        <span className="title" onClick={() => this.showPublisherDetail(publisher.Id)}>{publisher.Title}</span>
                                                    </td>
                                                    <td>{publisher.Code}</td>
                                                    <td>{publisher.kindText}</td>
                                                    <td>{publisher.Description}</td>
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
                        <ModalHeader toggle={this.closeModal.bind(this)}>Đầu báo</ModalHeader>
                        <ModalBody className="modal-body">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink active={this.state.activeTab[0] === 'general'} onClick={() => { this.selectedTab(0, 'general'); }}>
                                        <i className="fa fa-tasks"></i> &nbsp;Thông tin chung
                                </NavLink>
                                </NavItem>
                                {!this.state.createModalMode ?
                                    <NavItem>
                                        <NavLink active={this.state.activeTab[0] === 'statistics'} onClick={() => { this.selectedTab(0, 'statistics'); }}>
                                            <i className="fa fa-line-chart"></i>&nbsp;Thống kê
                                    </NavLink>
                                    </NavItem>
                                    : null}
                            </Nav>
                            <TabContent activeTab={this.state.activeTab[0]}>
                                {this.tabPane()}
                            </TabContent>

                        </ModalBody>
                        <ModalFooter>
                            {this.state.createModalMode ?
                                <Button color="primary" onClick={this.createPublisher.bind(this)}>Thêm mới</Button>
                                :
                                <Button color="primary" onClick={this.updatePublisher.bind(this)}>Cập nhật</Button>
                            }
                            <Button color="secondary" onClick={this.closeModal.bind(this)}>Hủy</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Publishers;