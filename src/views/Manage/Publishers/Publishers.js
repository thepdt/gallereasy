import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Input, Label, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PublisherService from './PublisherService';
import './../style.css';
import Widget04 from './../../Widgets/Widget04';
const Toolbars = React.lazy(() => import('./../../../components/Toolbars'));

class Publishers extends Component {
    _publisherService = new PublisherService();

    constructor(props) {
        super(props);

        this.state = {
            publishers: this._publisherService.List(),
            checkedPublishers: [],
            checkedAll: false,
            modal: false,
            activeTab: ['general', 'statistics'],
        };
        this.showPublisherDetail = this.showPublisherDetail.bind(this);

    }

    // Show detail Publisher
    showPublisherDetail(id) {
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

    checkOne(Id) {
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

    updatePublisher() {
        console.log("update");
    }

    deletePublisher() {
        console.log("deleted");
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

    tabPane() {
        return (
            <>
                <TabPane tabId="general">
                    {
                        <div>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="title-input">Tên đầu báo</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <Input type="text" id="title-input" name="title-input" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="code-input">Mã đầu báo</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <Input type="text" id="code-input" name="code-input" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="code-input">Logo đầu báo</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <Input type="text" id="code-input" name="code-input" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="1">
                                    <Label htmlFor="code-input">Loại đầu báo</Label>
                                </Col>
                                <Col xs="12" md="11">
                                    <Input type="text" id="code-input" name="code-input" />
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

                        </div>
                    }
                </TabPane>

                <TabPane tabId="statistics">
                    {
                        <div className="container">
                            <FormGroup row>
                                <Col md="4">
                                    <Widget04 icon="icon-user-following" color="primary" header="972" value="25" invert>Số người theo dõi</Widget04>
                                </Col>
                                <Col md="4">
                                    <Widget04 icon="fa fa-newspaper-o" color="info" header="972" value="25" invert>Số bài đăng lưu trên hệ thống</Widget04>
                                </Col>
                                <Col md="4">
                                    <Widget04 icon="fa fa-film" color="warning" header="972" value="25" invert>Số videos lưu trên hệ thống</Widget04>
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
                            onDelete={e => this.deletePublisher(e)}
                            onShowDetail={e => this.showPublisherDetail(e)}
                            onSearch={e => this.searchPublisher(e)}
                            searchPlaceholder1={'Tìm kiếm theo tên đầu báo'}
                            searchPlaceholder2={'Tìm kiếm theo mã đầu báo '} />
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
                                            <th scope="col">Tên đầu báo</th>
                                            <th scope="col">Mã đầu báo</th>
                                            <th scope="col">Loại đầu báo </th>
                                            <th scope="col">Mô tả</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.publishers.map((publisher, index) =>
                                            (< tr key={publisher.Id.toString()} >
                                                <td >
                                                    <label className="checkboxLabel">
                                                        <Input className="form-check-input" type="checkbox" id={publisher.Id} name={publisher.Id} value={publisher.checked} checked={publisher.checked} onChange={() => this.checkOne(publisher.Id)} />
                                                        <span className="label-text"></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <span className="title" onClick={() => this.showPublisherDetail(publisher.Id)}>{publisher.Title}</span>
                                                </td>
                                                <td>{publisher.Code}</td>
                                                <td>{publisher.Kind}</td>
                                                <td>{publisher.Description}</td>
                                            </tr>)
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.showPublisherDetail} className={'modal-lg ' + this.props.className}>
                    <ModalHeader toggle={this.showPublisherDetail}>Đầu báo</ModalHeader>
                    <ModalBody className="modal-body">
                        <Nav tabs>
                            <NavItem>
                                <NavLink active={this.state.activeTab[0] === 'general'} onClick={() => { this.selectedTab(0, 'general'); }}>
                                    <i className="fa fa-tasks"></i> &nbsp;Thông tin chung
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
                        <Button color="primary" onClick={this.updatePublisher}>Cập nhật</Button>{' '}
                        <Button color="secondary" onClick={this.showPublisherDetail}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Publishers;